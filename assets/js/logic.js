// Creating map object
var myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 4
});


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

// Load in geojson data
var geoDataPath = "assets/data/US.geojson";
var geojson;

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
      ...testData[apiDataIndex],
    };

    geoDatum.properties = newProps;
  });

  return geoData;
}

// Grab data with d3
d3.json(geoDataPath, function (data) {
  console.log("testData", testData);
  data = zipAPIDataToGeoJSON(data, testData);

  console.log("data after zipping together files", data);

  // Create a new choropleth layer
  var geojson = L.choropleth(data, {
    // Define what  property in the features to use
    valueProperty: "initial_claims",

    // Set color scale
    scale: ["yellow", "green"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "black",
      weight: 1,
      fillOpacity: 0.8,
    },

    // Binding a pop-up to each layer
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        // console.log(feature.properties.state)
        feature.properties.state +
          " </br>New Unemployment Claims: " +
          feature.properties.initial_claims
      );
    },
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo =
      "<h1>Unemployment Claims</h1>" +
      '<div class="labels">' +
      '<div class="min">' +
      limits[0] +
      "</div>" +
      '<div class="max">' +
      limits[limits.length - 1] +
      "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>');
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  var overlayMaps = {
    Choropleth: geojson,
  };

  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  // Adding legend to the map
  legend.addTo(myMap);
});
