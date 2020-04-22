// Creating map object
var myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 4,
});
addLayers(myMap);
addLegend(myMap);

// global to hold the chloropleth, so we can remove it
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
    ? "ffff00"
    : (d = 0 ? "black" : "black");
}

//Add the legend
function addLegend(myMap) {
  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "info legend"),
      grades = [0, 1, 1000, 2000, 5000, 10000, 20000, 50000, 100000],
      labels = [];

    //Add special label for no data
    div.innerHTML +=
      '<i style="background:' + getColor(grades[0] + 1) + '"></i> No Data <br>';

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 1; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' +
        getColor(grades[i] + 1) +
        '"></i> ' +
        grades[i] +
        (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }

    return div;
  };

  legend.addTo(myMap);
}

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

function buildChloropleth(apiReturn) {
  // Load in geojson data
  geojson && geojson.remove();

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
