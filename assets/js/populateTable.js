// call data from database

d3.json(`https://unemployment-during-covid19.herokuapp.com/unemploymentData`, (data) => {
    console.log(data);
    buildTable(data);
});


// Get a reference to the table body
var tbody = d3.select("tbody");

var tableData = data;

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



