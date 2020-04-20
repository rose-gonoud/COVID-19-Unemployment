
// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var state_abbr = d3.select("#stockInput").node().value;
  console.log(state_abbr);

  // clear the input value
  d3.select("#stockInput").node().value = "";

  // Build the plot with the new stock
  buildPlot(state_abbr);
}

function buildPlot(state_abbr) {
var url = `http://127.0.0.1:5000/unemploymentData?start_date=2020-01-01&state_abbr=${state_abbr}`;
  d3.json(url).then(function(data) {
    console.log(data);
    // Grab values from the response json object to build the plots
    var state_abbr = data.map(function(state){
      return state.state_abbr;
    });
    console.log(state_abbr);
    var state = data.map(function(state){
      return state.state;
    });
    console.log(state_abbr);
    var claims = data.map(function(state){
      return state.initial_claims;
    });
    console.log(claims);
    var startDate = data.map(function(state){
      return state.reflecting_week_ended.slice(0,16);
    });
    console.log(startDate);
    var endDate = data.map(function(state){
      return state.file_week_ended.slice(0,16);
    });
    console.log(endDate);

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: state_abbr,
      x: startDate,
      y: claims,
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace1];

    var layout = {
      title: `${state[0]} Unemployment claims`,
      xaxis: {
        range: [startDate],
        
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);

  });
}

// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);





