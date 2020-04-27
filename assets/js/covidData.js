async function getCovidData(country_code, date) {
  let baseURL = "https://covid-19-statistics.p.rapidapi.com/reports";
  let queryString = `?iso=${country_code}&date=${date}`;

    returnVal = d3.json(baseURL + queryString)
        .header("x-rapidapi-host", "covid-19-statistics.p.rapidapi.com")
        .header("x-rapidapi-key", covidAPI_KEY)

//   returnVal = fetch (baseURL + queryString, {
//     method: "GET", // *GET, POST, PUT, DELETE, etc.
//     headers: {
//       "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
//       "x-rapidapi-key": covidAPI_KEY,
//     },
//   })
//     .then((response) => {


    //   const reader = response.body.getReader();
    //   const stream = new ReadableStream({
    //     start(controller) {
    //       // The following function handles each data chunk
    //       function push() {
    //         // "done" is a Boolean and value a "Uint8Array"
    //         return reader.read().then(({ done, value }) => {
    //           // Is there no more data to read?
    //           if (done) {
    //             // Tell the browser that we have finished sending data
    //             controller.close();
    //             return;
    //           }

    //           // Get the data and send it to the browser via the controller
    //           controller.enqueue(value);
    //           push();
    //         });
    //       }

    //       push();
    //     },
    //   });
    //   return new Response(stream, { headers: { "Content-Type": "text/html" } });
    // })

    // .catch((err) => {
    //   console.log("Api Request failed with error", err);
    // });

    return console.log(returnVal);
}

getCovidData("USA", "2020-02-02");
