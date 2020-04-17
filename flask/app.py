import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, request
from flask_cors import CORS

# Database Setup
engine = create_engine("sqlite:///../assets/data/Project2.db", echo='debug')

Base = automap_base()

Base.prepare(engine, reflect=True)

# Save reference to the unemployment table
unemployment = Base.classes.unemploymentData

# Flask Setup
app = Flask(__name__)
cors = CORS(app)

@app.route("/")
def welcome():

    start_menu = """<br>
                Explore our US unemployment data API! 
                <br><br>
                Add "/unemploymentData" to your current URL for all US unemployment data from Jan 2019 through the present day
                <br><br>
                Add optional start and end date filters with:
                <br>
                "/unemploymentData?start_date=__yyyy-mm-dd___&end_date=__yyyy-mm-dd___"
                <br><br>
                Add an optional state filter with:
                <br>
                "/unemploymentData?state=New York"
                <br>
                Input only full state names, spaces are acceptable.
                <br><br>
                You may choose to input only a start date, only an end date, or only a state filter.
                <br>
                Parameters left unspecified will default to the most general query possible.
                <br>
                Query parameters may be input in any order.
                """

    return start_menu

@app.route("/unemploymentData")
def unemploymentData():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    stateparam = request.args.get("state")
    stateparam = ['Alabama','Alaska']

    print("---------------------------")
    print("Whats in State:", stateparam)
    print("---------------------------")
    # stateparam = stateparam.split(',')
    # print("Whats in State after split:", stateparam)
    # print("---------------------------")
    # stateparam = [state.capitalize() for state in stateparam]
    # print("LOOK HERE", type(stateparam))
    # print("---------------------------")

    session = Session(engine)

    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # my previous commit contains a working API under all conditions specified in "/" home route, for only one state selected
    # this is an attempt to process a multi-select on state
    # base /unemploymentData route returns empty now, all empty unless just one state is specified
    # right now, even when there's no state info in URL query for dates breaks and returns empty json
    # one state works when specified, multiple states as "state=New%20York,%20Alabama" or "state=New%20York,Alabama", etc do not work
    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    if not start_date:
        # query the min of all file_week_ended entries if no date is given in that parameter
        min_start_date = session.query(func.min(unemployment.file_week_ended))
        start_date = min_start_date

    if not end_date:
        # query the max of all file_week_ended entries if no date is given in that parameter
        max_end_date = session.query(func.max(unemployment.file_week_ended))
        end_date = max_end_date

    if not stateparam:
        results = session.query(unemployment).filter(unemployment.file_week_ended >= start_date).filter(unemployment.file_week_ended <= end_date)
    
    if isinstance(stateparam, list):
        stateparam = stateparam.split(',')
        stateparam = [state.capitalize() for state in stateparam]
        print("Are you making it to this line?")
        # this should make an array of states valid
        results = session.query(unemployment).filter(unemployment.file_week_ended >= start_date).filter(unemployment.file_week_ended <= end_date).filter(unemployment.state.in_(stateparam)).all()

    else:
        print("The logic test doesnt think its a list")
        results = session.query(unemployment).filter(unemployment.file_week_ended >= start_date).filter(unemployment.file_week_ended <= end_date).filter(unemployment.state == stateparam)

    session.close()

    data = []
    for result in results:
        data.append({
            "state": result.state,
            "file_week_ended": result.file_week_ended,
            "initial_claims": result.initial_claims,
            "reflecting_week_ended": result.reflecting_week_ended,
            "continued_claims": result.continued_claims,
            "covered_employment": result.covered_employment,
            "insured_unemployment_rate": result.insured_unemployment_rate
        })

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)