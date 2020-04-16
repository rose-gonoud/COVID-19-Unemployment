import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import Column, Integer, String, Float

from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, request
from flask_cors import CORS

# Database Setup
engine = create_engine("sqlite:///../assets/data/Project2.db")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
unemployment = Base.classes.unemploymentData

# Flask Setup
app = Flask(__name__)
cors = CORS(app)

@app.route("/")
def welcome():

    session = Session(engine)
    """Here is the most recent data for each state."""

    results = session.query(unemployment).filter(unemployment.file_week_ended == "2020-03-28")
    
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

@app.route("/unemploymentData")
def unemploymentData():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    state = request.args.get("state")

    print("---------------------------")
    print(start_date, end_date, state)
    print("---------------------------")

    return f"{start_date}{end_date}{state}"

if __name__ == '__main__':
    app.run(debug=True)