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

  stats["State With the Most Continued Claims"] = getStateWithMaxContClaims(
    data
  );
  stats["Average number of New Claims"] = getAvgNewClaims(data);
  stats[""] = getAvgUnemploymentRate(data);

  maxDate = filterMostRecentWeekData(data);

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

function getAvgNewClaims(data) {
  //Get the state with the most open claims within the period.
  let allInitialClaims = data.map((entry) => {
    return entry.initial_claims;
  });

  // take an elegant sum
  const total = allInitialClaims.reduce(
    (accumulator, element) => accumulator + element,
    0
  );
  // calculate an average
  let avgInitialClaims = total / allInitialClaims.length;

  return avgInitialClaims;
}

function getAvgUnemploymentRate(data) {
  //Get the state with the most open claims within the period.
  let unemploymentRate = data.map((entry) => {
    return entry.insured_unemployment_rate;
  });

  // take an elegant sum
  const total = unemploymentRate.reduce(
    (accumulator, element) => accumulator + element,
    0
  );
  // calculate an average
  let avgUnemploymentRate = total / unemploymentRate.length;

  // let avgContinuedClaimsIndex = allContinuedClaims.indexOf(avgContinuedClaim);

  return avgUnemploymentRate;
}

//Takes in the data set and returns only the elements where week filed is most recont
function filterMostRecentWeekData(data) {
  maxDate = moment(data[0].file_week_ended).format("YYYY[-]MM[-]DD");

  data.forEach((entry, i) => {
    entryDate = moment(entry.file_week_ended).format("YYYY[-]MM[-]DD");
    if (entryDate > maxDate) {
      maxDate = entryDate;
    }
  });

  filteredSet = data.filter((entry) => {
    return moment(entry.file_week_ended).format("YYYY[-]MM[-]DD") == maxDate;
  });

  return filteredSet;
}

// continued_claims: 22085
// covered_employment: 1894608
// file_week_ended: "Sat, 05 Jan 2019 00:00:00 GMT"
// initial_claims: 6660
// insured_unemployment_rate: 1.17
// reflecting_week_ended: "Sat, 29 Dec 2018 00:00:00 GMT"
// state: "Alabama"
// state_abbr: "AL"
