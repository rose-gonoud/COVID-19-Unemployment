var apiReturn = [];

d3.json(`https://unemployment-during-covid19.herokuapp.com/unemploymentData`, (data) => {
  apiReturn = data;
});

console.log(data)

// d3.map()

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