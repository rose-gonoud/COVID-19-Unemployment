# Unemployment Data in the Age of COVID-19, Project 2

### Overall Project Scope and Objective

This work displays US unemployment data from 2019 through the present day in a responsive browser dashboard. Its primary feature is a map containg US unemployment data claim numbers, broken down by state and visualized using a color-coded gradient system. Each state's total number of unemployment claims for a user-selected period of time will display as an aggregate - that is, the entirety of any given state will be represented as a single color.

An additional map layer represents the number of COVID-19 related deaths each state has experienced through the present day. This code pulls from a publically hosted API (http://coronavirusapi.com/) in real time, so that our dashboard's data is always as updated as its source. Code for this particular layer was adapted from our collaborator Jesse Caldwell's personal repository: https://github.com/CollectionOfAtoms/covid_visualization.

Data may be filtered by custom date ranges and a custom multi-select state menu (rendering dat for any single state or possible combination of multiple states). This dashboard also contains line graph visualizations for both total claim numbers and unemployment rates, responsive to the same combinations of filters above. All dashboard interfaces update in unison in response to user input.

Linked on the navigation bar, there is an additional data table allowing the user to browse our raw numerical data.

### Our Tools

https://oui.doleta.gov/unemploy/claims.asp

The above link provided us with our raw US unemployment data as a .csv. As this source is updated, we will download new data packets and store them in our SQLite database, represented in JSON format. Our Python Flask app queries this database with values tethered to dashboard user input.

### Heroku Deployment

Here you can find the Flask app public repo: https://github.com/rose-gonoud/herokuProject2, and our Heroku-hosted interface: https://unemployment-during-covid19.herokuapp.com/




### Division of Labor in Development

#### Christian

- [x] Download the data sets from the the unemployment database for every state's data from
- [x] Create a Mongo or SQL database with a single entry per line
- [x] Create a Logo for the page

#### Rose

- [x] Get data set from Christian
- [x] Convert SQL database to SQLlite using SQLAlchemy
- [x] Create a Python flask app that reads from the database.
- [x] Set up API routes with optional query parameters that execute the corresponding SQL query, and return only that subset of results.

#### Luisa

- [ ] Create a dashboard layout that visualizes the unemployment data in whatever ways seem good.
  - [x] Create a mock-up of the main dashboard.
  - [x] Create Index.js with places for each chart that we want
  - [x] Create start date and end date selectors in the HTML (Two tick slider maybe?)
  - [x] Create state selector in HTML (consider a multiselect field)
  - [x] Display statistics section (max applications in range, min applications in range)
  - [ ] Doubling Rate?
  - [x] "Data" page with filters that shows table of visualized data

#### Nathan

- [x] Work on creating a map visualization that can change the color value of each state according to a numeric value
- [x] Line Chart

#### Jesse

- [x] Check up on our .gitignore, and the security vulnerabilities identified by GitHub
- [ ] Project Ops. Help with any questions from any team member.
- [ ] Handle Git Merges, etc
- [ ] Collect other data that we may wish to correlate (Covid, Stock market)

#### Unassigned

- [x] Use onChange listeners in D3 to send out queries to Rose's API based on the values of those filters using the d3.json() function
- [x] Page CSS
- [ ] "Sources" page that reveals all sources of information
- [ ] "About" page that credits the creators
