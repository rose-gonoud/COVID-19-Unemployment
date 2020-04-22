function populateSummaryStats(data) {
  console.log("data in summarystats", data);

  d3.select("#summaryStats").text(" ");

  let stats = calculateStats(data);

  for (let [key, value] of Object.entries(stats)) {
    d3.select("#summaryStats").append("div").text(`${key}: ${value}`);
  }
}

// Takes in a data set and returns an object of relevant statistics
function calculateStats(data) {
  stats = {};

  stats["State with most continued claims"] = getStateWithMaxContClaims(data);

  return stats;
}

function getStateWithMaxContClaims(data) {
  //Get the state with the most open claims within the period.
  let allContinuedClaims = data.map((entry) => {
    return entry.continued_claims;
  });

  let maxContinuedClaim = Math.max(...allContinuedClaims);

  let maxContinuedClaimsIndex = allContinuedClaims.indexOf(maxContinuedClaim);

  return data[maxContinuedClaimsIndex].state;
}

// d3.select("#summarystats")
//     .selectAll("div").remove();

//     for (let [key, value] of Object.entries(meta)) {
//         d3.select("#sample-metadata")
//         .append("div").text(`${key}: ${value}`);
//       };

//   .data(apiReturn)
//   .enter()
//   .append("tr")
//   .html(function(d) {
//     return `<td>${d.date}</td><td>${d.low}</td><td>${d.high}</td>`;
//   });

// continued_claims: 22085
// covered_employment: 1894608
// file_week_ended: "Sat, 05 Jan 2019 00:00:00 GMT"
// initial_claims: 6660
// insured_unemployment_rate: 1.17
// reflecting_week_ended: "Sat, 29 Dec 2018 00:00:00 GMT"
// state: "Alabama"
// state_abbr: "AL"
