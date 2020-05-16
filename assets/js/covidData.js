// We have successfully queried the API and can see it in the .get of the d3.json,
// But we are having difficulty setting the return of getCovidData to a value that is only accessible
// In the .get itself.

// d3.json was returning an object, not a promise,
// and the async on getCovidData was throwing a dummy resolved promise in the output to prevent error
// called the return of getCovidData the query
// and turned the operation into a promise that resolved to root.data
function queryCovidAPI(country_code, date) {
  let baseURL = "https://covid-19-statistics.p.rapidapi.com/reports";
  let queryString = `?iso=${country_code}&date=${date}`;

  return new Promise((resolve) => {
    d3.json(baseURL + queryString)
      .header("x-rapidapi-host", "covid-19-statistics.p.rapidapi.com")
      .header("x-rapidapi-key", covidAPI_KEY)
      .get((err, root) => {
        console.log("root.data", root.data);
        resolve(root.data);
      });
  });
}

/** Queries the CovidAPI to get data for a specific date.
 * if none is provided, then it defaults to yesterday
 */
async function getCovidData(date = null) {
  console.log("getCovidData date", date);

  let data = getLocalData("cachedCovidData");
  let yesterday = moment().subtract(1, "days").format("YYYY[-]MM[-]DD");

  if (!date) {
    date = yesterday;
  }

  console.log("getCovidData date", date);

  console.log("local data", data);

  //If no data was found in the cache (or empty array)
  if (!data || data.length == 0) {
    //Query the API
    data = await queryCovidAPI("USA", date);
    //Cache the contents on the user's browser
    storeDataLocally("cachedCovidData", data);
  }
  //Data was found in the cache
  else {
    //Check if local data has date < today
    datesInCache = data.map((entry) => entry.date);
    //Sort dates descending
    datesInCache.sort((a, b) => (a > b ? 1 : -1));
    console.log("last date in cache:", datesInCache[0]);

    if (datesInCache[0] != date) {
      //Query the API
      data = await queryCovidAPI("USA", date);
      //Cache the contents on the user's browser
      storeDataLocally("cachedCovidData", data);
    }
  }

  return data;
}

// Nicholas taught me about browser caching to minimize API calls!
// could be implemented in the Real Version if told to update the cache key in response to user fields
function storeDataLocally(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
function getLocalData(key) {
  return JSON.parse(localStorage.getItem(key));
}
