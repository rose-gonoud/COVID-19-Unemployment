// We have successfully queried the API and can see it in the .get of the d3.json,
// But we are having difficulty setting the return of getCovidData to a value that is only accessible
// In the .get itself.
async function getCovidData(country_code, date) {
  let baseURL = "https://covid-19-statistics.p.rapidapi.com/reports";
  let queryString = `?iso=${country_code}&date=${date}`;

  d3.json(baseURL + queryString)
    .header("x-rapidapi-host", "covid-19-statistics.p.rapidapi.com")
    .header("x-rapidapi-key", covidAPI_KEY)
    .get((err, root) => {
      console.log(root.data);
      return root.data;
    });

  console.log(returnVal);
}

function test() {
  getCovidData("USA", "2020-04-02").then((data) => console.log(data));
}

test();
