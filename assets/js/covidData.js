// We have successfully queried the API and can see it in the .get of the d3.json,
// But we are having difficulty setting the return of getCovidData to a value that is only accessible
// In the .get itself.

// d3.json was returning an object, not a promise,
// and the async on getCovidData was throwing a dummy resolved promise in the output to prevent error
// called the return of getCovidData the query
// and turned the operation into a promise that resolved to root.data
function getCovidData(country_code, date) {
  let baseURL = "https://covid-19-statistics.p.rapidapi.com/reports";
  let queryString = `?iso=${country_code}&date=${date}`;

  return new Promise(resolve => {
    d3.json(baseURL + queryString)
        .header("x-rapidapi-host", "covid-19-statistics.p.rapidapi.com")
        .header("x-rapidapi-key", covidAPI_KEY)
        .get((err, root) => {
            console.log("root.data", root.data);
            resolve(root.data);
        });
    })
}

// now we call getCovidData with async/await and it will run getCovidData and grab as its return the .get resolution
async function test() {
    // scrapped the .then on the return to prevent accidentally mutating response in unwanted ways
    // we have output saved as data, and can use it in different ways!

    //  **************************************************************
    // I already called data on these parameters and threw it in cache, so commented out the important call here"
//   let data = await getCovidData("USA", "2020-04-02");

  let data = getLocalData("cachedCovidData")

  console.log("external, data", data)
}

test();

// Nicholas taught me about browser caching to minimize API calls!
// could be implemented in the Real Version if told to update the cache key in response to user fields
function storeDataLocally(key, value) {
    return localStorage.setItem(key, JSON.stringify(value))
}
function getLocalData(key) {
    return JSON.parse(localStorage.getItem(key))
}