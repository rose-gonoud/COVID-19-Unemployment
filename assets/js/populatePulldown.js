// Set default dates in date fields
d3.select("#startDate").property("value", "2019-01-01");
d3.select("#endDate").property("value", moment().format("YYYY[-]MM[-]DD"));

d3.json(`https://unemployment-during-covid19.herokuapp.com/unemploymentData`, (data) => {
  apiReturn = data;
});

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

  // Call out the the API with values from the filter fields
  d3.json(
    `https://unemployment-during-covid19.herokuapp.com/unemploymentData?state_abbr=${selValues.toString()}&start_date=${startDate}&end_date=${endDate}`,
    (data) => {
      apiReturn = data;
      console.log("api returned", apiReturn);
      buildPlot(data);
      buildChloropleth(data);
    }
  );
}
