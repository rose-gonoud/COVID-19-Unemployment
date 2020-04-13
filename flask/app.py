import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float

from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

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

@app.route("/")
def welcome():

    # Create our session (link) from Python to the DB
    session = Session(engine)
    allStates = []
    """Here is our data so far."""
    # Query all states
    results = session.query(unemployment.state).all()
    for result in results:
        if allStates.count(result[0]) == 0:
            allStates.append(result[0])

    session.close()

    returnString = ""
    for state in allStates:
        returnString += f"{state} <br>"
    return returnString

if __name__ == '__main__':
    app.run(debug=True)