// Creating map object
var myMap = L.map("map", {
  center: [43.6150, -116.2023],
  zoom: 3,
});
addLayers(myMap);
addLegend(myMap);

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
  streets.addTo(myMap);
  //Add controls to switch between layers
  L.control.layers(baseMaps).addTo(myMap);
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// addition of covid-19 statistics per state
async function covid() {

  composeStateData().then(stateData => {
    console.log("stateData", stateData);

    let radius_multiplier = 7;

    stateData.forEach(state => {
      L.circle([state.latitude, state.longitude], {
        color: "black",
        fillColor: "gray",
        fillOpacity: 0.3,
        radius: radius_multiplier * state.cases
      }).addTo(myMap);

      L.circle([state.latitude, state.longitude], {
        color: "red",
        fillColor: "red",
        fillOpacity: 1,
        radius: radius_multiplier * state.deaths
      }).addTo(myMap);
    });
  });
}

// need proxyURL because the API doesn't send back the right cors header

async function getMostRecentCoronaData(state) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiURL = "http://coronavirusapi.com/getTimeSeries/";

  returnVal = fetch(
    proxyUrl + apiURL + state,
    {
      method: "GET" // *GET, POST, PUT, DELETE, etc.
    } // no-cors, *cors, same-origin
  )
    .then(response => {
      return response.text();
    })
    .then(body => {
      body = body.split("\n");
      body.forEach((row, index) => {
        body[index] = row.split(",");
      });
      return body[body.length - 1];
    })
    .then(mostRecentCoronaData => {
      return mostRecentCoronaData;
    })
    .catch(err => {
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
  var stateData = [
    {
      state: "Alabama",
      latitude: 32.799,
      longitude: -86.8073
    },
    {
      state: "Alaska",
      latitude: 61.385,
      longitude: -152.2683
    },
    {
      state: "Arizona",
      latitude: 33.7712,
      longitude: -111.3877
    },
    {
      state: "Arkansas",
      latitude: 34.9513,
      longitude: -92.3809
    },
    {
      state: "California",
      latitude: 36.17,
      longitude: -119.7462
    },
    {
      state: "Colorado",
      latitude: 39.0646,
      longitude: -105.3272
    },
    {
      state: "Connecticut",
      latitude: 41.5834,
      longitude: -72.7622
    },
    {
      state: "Delaware",
      latitude: 39.3498,
      longitude: -75.5148
    },
    {
      state: "Florida",
      latitude: 27.8333,
      longitude: -81.717
    },
    {
      state: "Georgia",
      latitude: 32.9866,
      longitude: -83.6487
    },
    {
      state: "Hawaii",
      latitude: 21.1098,
      longitude: -157.5311
    },
    {
      state: "Idaho",
      latitude: 44.2394,
      longitude: -114.5103
    },
    {
      state: "Illinois",
      latitude: 40.3363,
      longitude: -89.0022
    },
    {
      state: "Indiana",
      latitude: 39.8647,
      longitude: -86.2604
    },
    {
      state: "Iowa",
      latitude: 42.0046,
      longitude: -93.214
    },
    {
      state: "Kansas",
      latitude: 38.5111,
      longitude: -96.8005
    },
    {
      state: "Kentucky",
      latitude: 37.669,
      longitude: -84.6514
    },
    {
      state: "Louisiana",
      latitude: 31.1801,
      longitude: -91.8749
    },
    {
      state: "Maine",
      latitude: 44.6074,
      longitude: -69.3977
    },
    {
      state: "Maryland",
      latitude: 39.0724,
      longitude: -76.7902
    },
    {
      state: "Massachusetts",
      latitude: 42.2373,
      longitude: -71.5314
    },
    {
      state: "Michigan",
      latitude: 43.3504,
      longitude: -84.5603
    },
    {
      state: "Minnesota",
      latitude: 45.7326,
      longitude: -93.9196
    },
    {
      state: "Mississippi",
      latitude: 32.7673,
      longitude: -89.6812
    },
    {
      state: "Missouri",
      latitude: 38.4623,
      longitude: -92.302
    },
    {
      state: "Montana",
      latitude: 46.9048,
      longitude: -110.3261
    },
    {
      state: "Nebraska",
      latitude: 41.1289,
      longitude: -98.2883
    },
    {
      state: "Nevada",
      latitude: 38.4199,
      longitude: -117.1219
    },
    {
      state: "New Hampshire",
      latitude: 43.4108,
      longitude: -71.5653
    },
    {
      state: "New Jersey",
      latitude: 40.314,
      longitude: -74.5089
    },
    {
      state: "New Mexico",
      latitude: 34.8375,
      longitude: -106.2371
    },
    {
      state: "New York",
      latitude: 42.1497,
      longitude: -74.9384
    },
    {
      state: "North Carolina",
      latitude: 35.6411,
      longitude: -79.8431
    },
    {
      state: "North Dakota",
      latitude: 47.5362,
      longitude: -99.793
    },
    {
      state: "Ohio",
      latitude: 40.3736,
      longitude: -82.7755
    },
    {
      state: "Oklahoma",
      latitude: 35.5376,
      longitude: -96.9247
    },
    {
      state: "Oregon",
      latitude: 44.5672,
      longitude: -122.1269
    },
    {
      state: "Pennsylvania",
      latitude: 40.5773,
      longitude: -77.264
    },
    {
      state: "Rhode Island",
      latitude: 41.6772,
      longitude: -71.5101
    },
    {
      state: "South Carolina",
      latitude: 33.8191,
      longitude: -80.9066
    },
    {
      state: "South Dakota",
      latitude: 44.2853,
      longitude: -99.4632
    },
    {
      state: "Tennessee",
      latitude: 35.7449,
      longitude: -86.7489
    },
    {
      state: "Texas",
      latitude: 31.106,
      longitude: -97.6475
    },
    {
      state: "Utah",
      latitude: 40.1135,
      longitude: -111.8535
    },
    {
      state: "Virginia",
      latitude: 37.768,
      longitude: -78.2057
    },
    {
      state: "Vermont",
      latitude: 44.0407,
      longitude: -72.7093
    },
    {
      state: "Washington",
      latitude: 47.3917,
      longitude: -121.5708
    },
    {
      state: "West Virginia",
      latitude: 38.468,
      longitude: -80.9696
    },
    {
      state: "Wisconsin",
      latitude: 44.2563,
      longitude: -89.6385
    },
    {
      state: "Wyoming",
      latitude: 42.7475,
      longitude: -107.2085
    }
  ];

  var stateAbbrs = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY"
  ];

  //Put all objects together
  stateData.forEach((state, index) => {
    state.abbr = stateAbbrs[index];
  });

  await asyncForEach(stateData, async state => {
    let stateData = await getMostRecentCoronaData(state.abbr);
    state.cases = +stateData[2];
    state.deaths = +stateData[3];
  });

  console.log(stateData);
  return stateData;
}

covid();

/**
 * Takes in geoJson object and appends data returned from the API to each states geoJSON entry
 * @param {geoJSON OBJECT} geoData The geoJson that is returned from d3.json when querying the geojson file attached
 * @param {*} apiReturn The return from the API
 */
function zipAPIDataToGeoJSON(geoData, apiReturn) {
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
  });

  return geoData;
}

//Given a value returns a color code
function getColor(d) {
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
    : (d === 0 ? "black" : "black");
}

//Add the legend
function addLegend(myMap) {
  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "info legend"),
      grades = [0, 1, 1000, 2000, 5000, 10000, 20000, 50000, 100000, "COVID deaths", "COVID cases"],
      labels = [];

    //Add special label for no data (( getColor(grades[0] + 1) ))
    div.innerHTML +=
      '<i style="background:' + "black" + '"></i> No Data <br>';

    // loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 1; i < grades.length - 3; i++) {
      div.innerHTML +=
        '<i style="background:' +
        getColor(grades[i] + 1) +
        '"></i> ' +
        grades[i] +
        (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }

    for (let i = 8; 7 < i && i < 11; i++) {
      div.innerHTML +=
        '<i style="background:' +
        getColor(grades[i]) +
        '"></i> ' +
        grades[i] + "<br><br>";
    }

    return div;
    }

  legend.addTo(myMap);
}

function buildChloropleth(apiReturn) {
  if (geojson) {
    console.log("removing old geojson");
    geojson.remove();
  }

  // Load in geojson data
  var geoDataPath = "assets/data/US.geojson";

  d3.json(geoDataPath, function (data) {
    apiReturn = filterMostRecentWeekData(apiReturn);
    data = zipAPIDataToGeoJSON(data, apiReturn);

    console.log("data after zipping together files", data);

    function style(feature) {
      return {
        fillColor: getColor(feature.properties.initial_claims),
        weight: 2,
        opacity: 1,
        color: "white",
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
        <br/>Unemployment Rate: ${feature.properties.insured_unemployment_rate}
        `
      );
    }

    geojson = L.geoJson(data, {
      style: style,
      onEachFeature: onEachFeature,
    }).addTo(myMap);
  });
}
