import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.dialects.postgresql import Any
# from sqlalchemy import or_

from flask import Flask, jsonify, request
from flask_cors import CORS

# Database Setup
engine = create_engine("sqlite:///../assets/data/Project2.db")

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
    state = request.args.get("state")
    state = ["New York", "Alabama"]
    print("LOOK HERE", type(state))

    session = Session(engine)

    if not start_date:
        # query the min of all file_week_ended entries if no date is given in that parameter
        min_start_date = session.query(func.min(unemployment.file_week_ended))
        start_date = min_start_date

    if not end_date:
        # query the max of all file_week_ended entries if no date is given in that parameter
        max_end_date = session.query(func.max(unemployment.file_week_ended))
        end_date = max_end_date

    if not state:
        results = session.query(unemployment).filter(unemployment.file_week_ended >= start_date).filter(unemployment.file_week_ended <= end_date)
    
    # how would I make an array of states valid?
    # SQLalchemy filter for "this field is contained within provided array"
    # what's the data type of the series of state names - what should that be?
    if type(state) == "<class 'list'>":
        results = session.query(unemployment).filter(unemployment.file_week_ended >= start_date).filter(unemployment.file_week_ended <= end_date).filter(Any(state, unemployment.state)).all()

    else:
        results = session.query(unemployment).filter(unemployment.file_week_ended >= start_date).filter(unemployment.file_week_ended <= end_date).filter(unemployment.state == state)


    # session.query(unemployment).filter(Any(state_array, unemployment.state)).all()
    # DBSession().query(MyTable).filter(or_(*[MyTable.my_column.like(name) for name in state]))

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

    print("---------------------------")
    print(type(start_date), type(end_date), type(state))
    print("---------------------------")

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)