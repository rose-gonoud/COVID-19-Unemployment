
/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}
function getMonthlyData() {

  // var queryUrl = `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&collapse=monthly&api_key=${apiKey}`;
  d3.json(testData).then(function(data) {
    // @TODO: Unpack the dates, open, high, low, close, and volume
    var continued_claims = unpack(data.continued_claims, 0);
    var covered_Employment = unpack(data.covered_Employment, 1);
    var file_week_ended = unpack(data.file_week_ended, 2);
    var initial_claims = unpack(data.initial_claims, 3);
    var insured_unemployment_rate = unpack(data.insured_unemployment_rate, 4);
    var reflecting_week_ended = unpack(data.reflecting_week_ended, 5);
    var state = unpack(data.state, 6);
    buildTable(continued_claims, covered_Employment, file_week_ended, initial_claims, insured_unemployment_rate, reflecting_week_ended, state);
  });
}

function buildTable(continued_claims, covered_Employment, file_week_ended, initial_claims, insured_unemployment_rate, reflecting_week_ended, state) {
  var table = d3.select("#summary-table");
  var tbody = table.select("tbody");
  var trow;
  for (var i = 0; i < 12; i++) {
    trow = tbody.append("tr");
    trow.append("td").text(continued_claims[i]);
    trow.append("td").text(covered_Employment[i]);
    trow.append("td").text(file_week_ended[i]);
    trow.append("td").text(initial_claims[i]);
    trow.append("td").text(insured_unemployment_rate[i]);
    trow.append("td").text(reflecting_week_ended[i]);
    trow.append("td").text(state[i]);
  }
}
  function buildPlot() {
  // var queryUrl = `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&collapse=monthly&api_key=${apiKey}`;
  d3.json(testData, function(data) {
    console.log(testData);
    // @TODO: Unpack the dates, open, high, low, close, and volume
    var continued_claims = testData.continued_claims;
    var covered_Employment = testData.continued_claims;
    var file_week_ended = testData.file_week_ended;
    var initial_claims = testData.initial_claims;
    var  insured_unemployment_rate = testData.insured_unemployment_rate;
    var reflecting_week_ended= testData.reflecting_week_ended;
    var state= testData.state;
    var continued_claims = unpack(testData.continued_claims, 0);
    var covered_Employment = unpack(testData.covered_Employment, 1);
    var file_week_ended = unpack(testData.file_week_ended, 2);
    var initial_claims = unpack(testData.initial_claims, 3);
    var insured_unemployment_rate = unpack(testData.insured_unemployment_rate, 4);
    var reflecting_week_ended = unpack(testData.reflecting_week_ended, 5);
    var state = unpack(testData.state, 6);

    getMonthlyData();
    var trace1 = {
      // @TODO: YOUR CODE HERE
      type: "scatter",
      mode: "lines",
      name: name,
      x: file_week_ended,
      y: initial_claims,
      line: {
        color: "#17BECF"
      }
    };

    // Candlestick Trace
    var trace2 = {
      // @TODO: YOUR CODE HERE
      type: "candlestick",
      x: file_week_ended,
    
    };

    var data = [trace1, trace2];

    var layout = {
      title: `${initial_claims} claims`,
      xaxis: {
        range: [file_week_ended, reflecting_week_ended],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      },
      showlegend: false
    };

    Plotly.newPlot("plot", data, layout);

  });
}

buildPlot();





