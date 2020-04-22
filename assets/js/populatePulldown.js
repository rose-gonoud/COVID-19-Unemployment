// Set default dates in date fields
d3.select("#startDate").property("value", "2019-01-01");
d3.select("#endDate").property("value", moment().format("YYYY[-]MM[-]DD"));

//Initial API call on page load
optionChanged();

pullDownMenu();

/**
 *
 * @param {var} value. This function creates array of options using the array of values in @param
 */

function pullDownMenu() {
  var dropdown = d3.select("#selState");
  // Log the entire dataset

  // For each ID in the array run a function
  stateData.forEach((element) => {
    // console.log(element);
    // Append an option element to the #selDataset dropdown with the id
    // in the value attribute as well as text between the open and closed tags.
    dropdown.append("option").attr("value", element.abbr).text(element.state);
  });
}

/**
 * When the select dropdown is changed this function will fire
 */

function optionChanged() {
  var selValues = [];
  selValues.push($("#selState").val());
  d3.select("#h-pulldown").text(selValues);

  startDate = d3.select("#startDate").property("value");
  endDate = d3.select("#endDate").property("value");

  // Reformat dates with moment.js
  startDate = moment(startDate).format("YYYY[-]MM[-]DD");
  endDate = moment(endDate).format("YYYY[-]MM[-]DD");

  //Build API call
  baseURL =
    "https://unemployment-during-covid19.herokuapp.com/unemploymentData";
  queryString = `?start_date=${startDate}&end_date=${endDate}`;

  //If no states are selected, default to returning all state data
  if (selValues.length > 0) {
    queryString += `&state_abbr=${selValues.toString()}`;
  }

  // Call out the the API with values from the filter fields
  d3.json(`${baseURL}${queryString}`, (data) => {
    apiReturn = data;
    console.log("api returned", apiReturn);
    buildPlot(data);
    buildChloropleth(data);
    populateSummaryStats(data);
  });
}
