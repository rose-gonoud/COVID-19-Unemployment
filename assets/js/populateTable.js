

//Initial API call on page load
pullDownMenu();
optionChanged();



// Get a reference to the table body
var tbody = d3.select("tbody");



function buildTable(data){

    // Clear table
        tbody.html("");
    // read the data
    data.forEach((data) => {
      var row = tbody.append("tr");
      Object.entries(data).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });
    
};

// 

function pullDownMenu() {
    var dropdown = d3.select("#selStateTable");
    // Log the entire dataset
  
    // For each ID in the array run a function
    stateData.forEach((element) => {
      console.log(element);
      // Append an option element to the #selDataset dropdown with the id
      // in the value attribute as well as text between the open and closed tags.
      dropdown.append("option").attr("value", element.abbr).text(element.state);
    });
  }

  function optionChanged() {
    var selValues = [];
    selValues.push($("#selStateTable").val());
    // d3.select("#h-pulldown").text(selValues);
  
    let startDate = d3.select("#startDateTable").property("value");
    let endDate = d3.select("#endDateTable").property("value");
  
    // Reformat dates with moment.js
    startDate = moment(startDateTable).format("YYYY[-]MM[-]DD");
    endDate = moment(endDateTable).format("YYYY[-]MM[-]DD");
  
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
      buildTable(data);
  
      
    });
  }

