// Creating map object
var myMap = L.map("map", {
  center: [39.5, -98.35],
  zoom: 4,
});
addLayers(myMap);

// global to hold the choropleth, so we can remove it
var geojson;

//Adds street, light and dark layers to the map
function addLayers(myMap) {
  // Adding tile layer
  var streets = L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY,
    }
  );

  var light = L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY,
    }
  );

  var dark = L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY,
    }
  );

  var baseMaps = {
    Streets: streets,
    Light: light,
    Dark: dark,
  };

  //Default to street layer
  dark.addTo(myMap);
  //Add controls to switch between layers
  L.control.layers(baseMaps).addTo(myMap);
}

// need proxyURL because the API doesn't send back the right cors header
// UPDATE 4/24/2020 It's dead the cors-anywhere proxy made too many requests and
// now there is a server error :P
async function getMostRecentCoronaData(state) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiURL = "http://coronavirusapi.com/getTimeSeriesJson/";

  returnVal = fetch(
    proxyUrl + apiURL + state,
    {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    } // no-cors, *cors, same-origin
  )
    .then((response) => {
      return response.text();
    })
    .then((body) => {
      body = body.split("\n");
      body.forEach((row, index) => {
        body[index] = row.split(",");
      });
      return body[body.length - 1];
    })
    .then((mostRecentCoronaData) => {
      return mostRecentCoronaData;
    })
    .catch((err) => {
      console.log("Api Request failed with error", err);
    });

  return returnVal;
}

// awaits the whole foreach to run before returning
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function composeStateData() {
  d3.json("assets/data/stateData.json", async (stateData) => {
    await asyncForEach(stateData, async (state) => {
      let stateData = await getMostRecentCoronaData(state.abbr);
      state.cases = +stateData[2];
      state.deaths = +stateData[3];
    });

    console.log(stateData);
    return stateData;
  });
}

/**
 * Takes in geoJson object and appends data returned from the API to each states geoJSON entry
 * @param {geoJSON OBJECT} geoData The geoJson that is returned from d3.json when querying the geojson file attached
 * @param {*} apiReturn The return from the API
 */
function zipAPIDataToGeoJSON(geoData, apiReturn, mode) {
  //Create array of states in the order that the apiReturn came back in
  apiDataStates = apiReturn.map((datum) => datum.state);

  geoData.features.forEach((geoDatum) => {
    // Lookup the corresponding entry from the API's data return with the most recent date that matches this entry by state
    apiDataIndex = apiDataStates.indexOf(geoDatum.properties.NAME);

    let newProps = {
      GEO_ID: geoDatum.properties.GEO_ID,
      CENSUSAREA: geoDatum.properties.CENSUSAREA,
      ...apiReturn[apiDataIndex],
    };

    geoDatum.properties = newProps;
    geoDatum.mode = mode;
  });

  return geoData;
}

//Given a value returns a color code
function getColor(d, mode) {
  if (mode == "initial_claims") {
    return d > 100000
      ? "#008000"
      : d > 50000
      ? "#3d9200"
      : d > 20000
      ? "#61a400"
      : d > 10000
      ? "#81b600"
      : d > 5000
      ? "#a1c800"
      : d > 2000
      ? "#c0da00"
      : d > 1000
      ? "#dfed00"
      : d > 1
      ? "#ffff00"
      : d === "COVID deaths"
      ? "#e11b22"
      : d === "COVID cases"
      ? "#708090"
      : d === 0
      ? "black"
      : "black";
  } else if (mode == "confirmed") {
    return d > 100000
      ? "#e9294a"
      : d > 50000
      ? "#eb3b59"
      : d > 20000
      ? "#ed4c68"
      : d > 10000
      ? "#ef5e77"
      : d > 5000
      ? "#f07086"
      : d > 2000
      ? "#f28295"
      : d > 1000
      ? "#f494a4"
      : d > 1
      ? "#f6a5b3"
      : d === 0
      ? "black"
      : "black";
  }
}
//Add the legend
function addLegend(myMap, mode) {
  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "info legend"),
      grades = [0, 1, 1000, 2000, 5000, 10000, 20000, 50000, 100000],
      labels = [];

    //Add special label for no data (( getColor(grades[0] + 1) ))
    div.innerHTML += '<i style="background:' + "black" + '"></i> No Data <br>';

    // loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 1; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' +
        getColor(grades[i] + 1, mode) +
        '"></i> ' +
        grades[i] +
        (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }

    return div;
  };

  legend.addTo(myMap);
}

function buildChloropleth(apiReturn, mode = "initial_claims") {
  if (geojson) {
    console.log("removing old geojson");
    geojson.remove();
  }

  // Load in geojson data
  var geoDataPath = "assets/data/US.geojson";

  d3.json(geoDataPath, function (data) {
    apiReturn = filterMostRecentWeekData(apiReturn);
    data = zipAPIDataToGeoJSON(data, apiReturn, mode);

    function style(feature) {
      return {
        fillColor: getColor(feature.properties[mode], feature.mode),
        weight: 2,
        opacity: 1,
        color: "black",
        fillOpacity: 0.7,
      };
    }

    function onEachFeature(feature, layer) {
      layer.bindPopup(
        `${feature.properties.state}
        <br/>File Week Ended: ${moment(
          feature.properties.file_week_ended
        ).format("MMMM Do YYYY")}
          <br/>New Unemployment Claims: ${feature.properties.initial_claims}
          <br/>Continued Claims: ${feature.properties.continued_claims}
          <br/>Unemployment Rate: ${
            feature.properties.insured_unemployment_rate
          }
          `
      );
    }

    geojson = L.geoJson(data, {
      style: style,
      onEachFeature: onEachFeature,
    }).addTo(myMap);
  });

  addLegend(myMap, mode);
}
