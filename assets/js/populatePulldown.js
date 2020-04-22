// Set default dates in date fields
d3.select("#startDate").property("value", "2020-02-01");
d3.select("#endDate").property("value", moment().format("YYYY[-]MM[-]DD"));

// Bind the optionChanged method to the input fields
d3.select("#startDate").on("change", optionChanged);
d3.select("#startDate").on("change", optionChanged);

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
 * When the select dropdown or one of the date filters is changed this function will fire
 */
function optionChanged() {
  var selValues = [];
  selValues.push($("#selState").val());
  // d3.select("#h-pulldown").text(selValues);

  let startDate = d3.select("#startDate").property("value");
  let endDate = d3.select("#endDate").property("value");

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
    console.log("api returned", data);

    //Generate a line plot
    buildPlot(data);
    buildPlot1(data);
    

    //Put a new chloropleth on the map
    buildChloropleth(data);
    populateSummaryStats(data);
  });
}
