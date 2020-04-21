console.log("apiReturn in plots", apiReturn);
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

function buildPlot(apiReturn) {
  var url = `http://127.0.0.1:5000/unemploymentapiReturn?start_date=2020-01-01&state_abbr=${state_abbr}`;
  console.log("apiReturn in buidPlot");
  // Grab values from the response json object to build the plots
  var state_abbr = apiReturn.map(function (state) {
    return state.state_abbr;
  });
  var state = apiReturn.map(function (state) {
    return state.state;
  });
  var claims = apiReturn.map(function (state) {
    return state.initial_claims;
  });
  var startDate = apiReturn.map(function (state) {
    return state.reflecting_week_ended.slice(0, 16);
  });
  var endDate = apiReturn.map(function (state) {
    return state.file_week_ended.slice(0, 16);
  });

  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: state_abbr,
    x: startDate,
    y: claims,
    line: {
      color: "#17BECF",
    },
  };

  var apiReturn = [trace1];

  var layout = {
    title: `${state[0]} Unemployment claims`,
    xaxis: {
      range: [startDate],
    },
    yaxis: {
      autorange: true,
      type: "linear",
    },
  };

  Plotly.newPlot((id = "plot"), apiReturn, layout);
}

// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);
