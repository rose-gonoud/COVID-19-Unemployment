# Interactive Data Visualization, Project 2

### Overall Project Scope and Objective

We intend to display nationwide unemployment data from 2019 through the present day, broken down by state. This data will be overlaid on a map, and visualized using a color-coded gradient system. Each state's total number of unemployment claims for a user-selected period of time (likely just by month?) will displayed as an aggregate - that is, the entirety of any given state will be represented as a single color.

We intend to display this map as part of a larger interactive dashboard. We imagine this dashboard will also have a data table the user can scroll through to view raw numerical data, and some sort of visualization (a scatter or bar chart).

We also plan to add a map layer representing the number of COVID-19 deaths per state up through the present day. So the density of unemployment claims would be prepresented by the color of the state on our map, and on top of that would be some indicaton of the number of COVID-19 deaths within that state to date.

We are playing with the idea of incorporating historical data that would be topically relevant (the 2008 recession, the 1918/19 flu epidemic's unemployment numbers, if they exist, etc.) but that is obviously a time-dependant addition.

### Our Tools

https://oui.doleta.gov/unemploy/claims.asp

The above link provided us with the raw unemployment data - it was downloaded as a CSV, and will be uploaded row by row into a MongoDB collection. Our flask app will read information from the database based on user input from our webpage/visual dashboard, and initialize real-time updates our dashboard with the result of the mongo query.

### Division of Work

#### Christian

- [x] Download the data sets from the the unemployment database for every state's data from
- [x] Create a Mongo or SQL database with a single entry per line
- [ ] Convert SQL database to SQLlite using SQLAlchemy

#### Rose

- [ ] Get data set from Christian
- [ ] Create a Python flask app that reads from the database.
- [ ] Set up API routes with optional query parameters that execute the corresponding SQL or Mongo query, and return only that subset of results.

#### Luisa

- [ ] Create a dashboard layout that visualizes the unemployment data in whatever ways seem good.

  - [ ] Line Chart
  - [ ] Doubling Rate?
  - [ ] Display statistics? (max applications in range, min applications in range)

#### Nathan

- [ ] Create start date and end date selectors in the HTML (Two tick slider maybe?)
- [ ] Create state selector in HTML (consider a multiselect field)
- [ ] Use onChange listeners in D3 to send out queries to Rose's API based on the values of those filters using the d3.json() function
- [ ] Work on creating a map visualization that can change the color value of each state according to a numeric value

#### Jesse

- [ ] Project Ops. Help with any questions from any team member.
- [ ] Handle Git Merges, etc
- [ ] Collect other data that we may wish to correlate (Covid, Stock market)

#### Unassigned

- [ ] Page CSS
- [ ] "Data" page with filters that shows table of visualized data
- [ ] "Sources" page that reveals all sources of information
- [ ] "About" page that credits the creators
- [ ] Logo
