// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var state_abbr = d3.select("#stockInput").node().value;
  console.log(state_abbr);

  // clear the input value
  d3.select("#stockInput").node().value = "";

  // Build the plot 
  buildPlot(state_abbr2);
}

function buildPlot(apiReturn1) {
  console.log("apiReturn1 in buidPlot");
  let alabama = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Alabama") {
      alabama.push(apiReturn1[i]);
    }
  }

  let alaska = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Alaska") {
      alaska.push(apiReturn1[i]);
    }
  }

  let arizona = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Arizona") {
      arizona.push(apiReturn1[i]);
    }
  }

  let arkansas = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Arkansas") {
      arkansas.push(apiReturn1[i]);
    }
  }

  let california = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "California") {
      california.push(apiReturn1[i]);
    }
  }

  let colorado = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Colorado") {
      colorado.push(apiReturn1[i]);
    }
  }

  let connecticut = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Connecticut") {
      connecticut.push(apiReturn1[i]);
    }
  }

  let delaware = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Delaware") {
      delaware.push(apiReturn1[i]);
    }
  }

  let florida = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Florida") {
      florida.push(apiReturn1[i]);
    }
  }

  let georgia = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Georgia") {
      georgia.push(apiReturn1[i]);
    }
  }

  let hawaii = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Hawaii") {
      hawaii.push(apiReturn1[i]);
    }
  }

  let idaho = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Idaho") {
      idaho.push(apiReturn1[i]);
    }
  }

  let illinois = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Illinois") {
      illinois.push(apiReturn1[i]);
    }
  }

  let indiana = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Indiana") {
      indiana.push(apiReturn1[i]);
    }
  }

  let iowa = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Iowa") {
      iowa.push(apiReturn1[i]);
    }
  }

  let kansas = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Kansas") {
      kansas.push(apiReturn1[i]);
    }
  }

  let kentucky = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Kentucky") {
      kentucky.push(apiReturn1[i]);
    }
  }

  let louisiana = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Louisiana") {
      louisiana.push(apiReturn1[i]);
    }
  }

  let maine = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Maine") {
      maine.push(apiReturn1[i]);
    }
  }

  let maryland = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Maryland") {
      maryland.push(apiReturn1[i]);
    }
  }

  let massachusetts = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Massachusetts") {
      massachusetts.push(apiReturn1[i]);
    }
  }

  let michigan = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Michigan") {
      michigan.push(apiReturn1[i]);
    }
  }

  let minnesota = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "minnesota") {
      minnesota.push(apiReturn1[i]);
    }
  }

  let mississippi = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Mississippi") {
      mississippi.push(apiReturn1[i]);
    }
  }

  let missouri = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Missouri") {
      missouri.push(apiReturn1[i]);
    }
  }

  let montana = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Montana") {
      montana.push(apiReturn1[i]);
    }
  }

  let nebraska = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Nebraska") {
      nebraska.push(apiReturn1[i]);
    }
  }

  let nevada = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Nevada") {
      nevada.push(apiReturn1[i]);
    }
  }

  let new_hampshire = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "New Hampshire") {
      new_hampshire.push(apiReturn1[i]);
    }
  }

  let new_jersey = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "New Jersey") {
      new_jersey.push(apiReturn1[i]);
    }
  }

  let new_mexico = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "New Mexico") {
      new_mexico.push(apiReturn1[i]);
    }
  }

  let new_york = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "New York") {
      new_york.push(apiReturn1[i]);
    }
  }

  let north_carolina = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "North Carolina") {
      north_carolina.push(apiReturn1[i]);
    }
  }

  let north_dakota = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "North Dakota") {
      north_dakota.push(apiReturn1[i]);
    }
  }

  let ohio = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Ohio") {
      ohio.push(apiReturn1[i]);
    }
  }

  let oklahoma = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Oklahoma") {
      oklahoma.push(apiReturn1[i]);
    }
  }

  let oregon = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Oregon") {
      oregon.push(apiReturn1[i]);
    }
  }

  let pennsylvania = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Pennsylvania") {
      pennsylvania.push(apiReturn1[i]);
    }
  }

  let rhode_island = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Rhode Island") {
      rhode_island.push(apiReturn1[i]);
    }
  }

  let south_carolina = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "South Carolina") {
      south_carolina.push(apiReturn1[i]);
    }
  }

  let south_dakota = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "South Dakota") {
      south_dakota.push(apiReturn1[i]);
    }
  }

  let tennessee = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Tennessee") {
      tennessee.push(apiReturn1[i]);
    }
  }

  let texas = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Texas") {
      texas.push(apiReturn1[i]);
    }
  }

  let utah = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Utah") {
      utah.push(apiReturn1[i]);
    }
  }

  let vermont = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Vermont") {
      vermont.push(apiReturn1[i]);
    }
  }

  let virginia = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Virginia") {
      virginia.push(apiReturn1[i]);
    }
  }

  let washington = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Washington") {
      washington.push(apiReturn1[i]);
    }
  }

  let west_virginia = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "West Virginia") {
      west_virginia.push(apiReturn1[i]);
    }
  }

  let wisconsin = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "Wisconsin") {
      wisconsin.push(apiReturn1[i]);
    }
  }

  let wyoming = [];
  for (let i = 0; i < apiReturn1.length; i++) {
    if (apiReturn1[i].state === "wyoming") {
      wyoming.push(apiReturn1[i]);
    }
  }

  // Grab values from the response json object to build the plots
  var state_abbr = apiReturn1.map(function (state) {
    return state.state_abbr;
  });

  var state = apiReturn1.map(function (state) {
    return state.state;
  });
  // claims for each state
  var claims = apiReturn1.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_AL = alabama.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_AK = alaska.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_AZ = arizona.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_AR = arkansas.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_CA = california.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_CO = colorado.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_CT = connecticut.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_DE = delaware.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_FL = florida.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_GA = georgia.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_HI = hawaii.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_ID = idaho.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_IL = illinois.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_IN = indiana.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_IA = iowa.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_KS = kansas.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_KY = kentucky.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_LA = louisiana.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_MA = maine.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_MD = maryland.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_ME = massachusetts.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_MI = michigan.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_MN = minnesota.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_MS = mississippi.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_MO = missouri.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_MT = montana.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_NE = nebraska.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_NV = nevada.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_NH = new_hampshire.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_NJ = new_jersey.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_NM = new_mexico.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_NY = new_york.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_NC = north_carolina.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_ND = north_dakota.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_OH = ohio.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_OK = oklahoma.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_OR = oregon.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_PA = oregon.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_RI = rhode_island.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_SC = south_carolina.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_SD = south_dakota.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_TN = tennessee.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_TX = texas.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_UT = utah.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_VT = vermont.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_VA = virginia.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_WA = washington.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_WV = west_virginia.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_WI = wisconsin.map(function (state) {
    return state.insured_unemployment_rate;
  });
  var rate_WY = wyoming.map(function (state) {
    return state.insured_unemployment_rate;
  });
  // Start date for each state
  var startDate = apiReturn1.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_AL = alabama.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_AK = alaska.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_AZ = arizona.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_AR = arkansas.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_CA = california.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_CO = colorado.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_CT = connecticut.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_DE = delaware.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_FL = florida.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_GA = georgia.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_HI = hawaii.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_ID = idaho.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_IL = illinois.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_IN = indiana.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_IA = iowa.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_KS = kansas.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_KY = kentucky.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_LA = louisiana.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_MA = maine.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_MD = maryland.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_ME = massachusetts.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_MI = michigan.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_MN = minnesota.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_MS = mississippi.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_MO = missouri.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_MT = montana.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_NE = nebraska.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_NV = nevada.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_NH = new_hampshire.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_NJ = new_jersey.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_NM = new_mexico.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_NY = new_york.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_NC = north_carolina.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_ND = north_dakota.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_OH = ohio.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_OK = oklahoma.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_OR = oregon.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_PA = oregon.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_RI = rhode_island.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_SC = south_carolina.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_SD = south_dakota.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_TN = tennessee.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_TX = texas.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_UT = utah.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_VT = vermont.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_VA = virginia.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_WA = washington.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_WV = west_virginia.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_WI = wisconsin.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });
  var startDate_WY = wyoming.map(function (state) {
    return state.file_week_ended.slice(4,16);
  });

  // var endDate = apiReturn1.map(function (state) {
  //   return state.file_week_ended.slice(4,16);
  // });

  var Alabama = {
    type: "scatter",
    mode: "lines",
    name: "Alabama",
    x: startDate_AL,
    y: rate_AL,
    line: {
      color: "red",
    },
  };

  var Alaska = {
    type: "scatter",
    mode: "lines",
    name: "Alaska",
    x: startDate_AK,
    y: rate_AK,
    line: {
      color: "green",
    },
  };

  var Arizona = {
    type: "scatter",
    mode: "lines",
    name: "Arizona",
    x: startDate_AZ,
    y: rate_AZ,
    line: {
      color: "blue",
    },
  };

  var Arkansas = {
    type: "scatter",
    mode: "lines",
    name: "Arkansas",
    x: startDate_AR,
    y: rate_AR,
    line: {
      color: "#ff9966",
    },
  };

  var California = {
    type: "scatter",
    mode: "lines",
    name: "California",
    x: startDate_CA,
    y: rate_CA,
    line: {
      color: "lightgreen",
    },
  };

  var Colorado = {
    type: "scatter",
    mode: "lines",
    name: "Colorado",
    x: startDate_CO,
    y: rate_CO,
    line: {
      color: "brown",
    },
  };

  var Connecticut = {
    type: "scatter",
    mode: "lines",
    name: "Connecticut",
    x: startDate_CT,
    y: rate_CT,
    line: {
      color: "grey",
    },
  };

  var Delaware = {
    type: "scatter",
    mode: "lines",
    name: "Delaware",
    x: startDate_DE,
    y: rate_DE,
    line: {
      color: "#lightblue",
    },
  };

  var Florida = {
    type: "scatter",
    mode: "lines",
    name: "Florida",
    x: startDate_FL,
    y: rate_FL,
    line: {
      color: "orange",
    },
  };

  var Georgia = {
    type: "scatter",
    mode: "lines",
    name: "Georgia",
    x: startDate_GA,
    y: rate_GA,
    line: {
      color: "#lightred",
    },
  };

  var Hawaii = {
    type: "scatter",
    mode: "lines",
    name: "Hawaii",
    x: startDate_HI,
    y: rate_HI,
    line: {
      color: "darkgreen",
    },
  };

  var Idaho = {
    type: "scatter",
    mode: "lines",
    name: "Idaho",
    x: startDate_ID,
    y: rate_ID,
    line: {
      color: "darkyellow",
    },
  };

  var Illinois = {
    type: "scatter",
    mode: "lines",
    name: "Illinois",
    x: startDate_IL,
    y: rate_IL,
    line: {
      color: "lightorange",
    },
  };

  var Indiana = {
    type: "scatter",
    mode: "lines",
    name: "Indiana",
    x: startDate_IN,
    y: rate_IN,
    line: {
      color: "darkred",
    },
  };

  var Iowa = {
    type: "scatter",
    mode: "lines",
    name: "Iowa",
    x: startDate_IA,
    y: rate_IA,
    line: {
      color: "lightyellow",
    },
  };

  var Kansas = {
    type: "scatter",
    mode: "lines",
    name: "Kansas",
    x: startDate_KS,
    y: rate_KS,
    line: {
      color: "#darkblue",
    },
  };

  var Kentucky = {
    type: "scatter",
    mode: "lines",
    name: "Kentucky",
    x: startDate_KY,
    y: rate_KY,
    line: {
      color: "#99ff99",
    },
  };

  var Louisiana = {
    type: "scatter",
    mode: "lines",
    name: "Louisiana",
    x: startDate_LA,
    y: rate_LA,
    line: {
      color: "purple",
    },
  };

  var Maine = {
    type: "scatter",
    mode: "lines",
    name: "Maine",
    x: startDate_MA,
    y: rate_MA,
    line: {
      color: "lightpurple",
    },
  };

  var Maryland = {
    type: "scatter",
    mode: "lines",
    name: "Maryland",
    x: startDate_MD,
    y: rate_MD,
    line: {
      color: "lightorange",
    },
  };

  var Massachusetts = {
    type: "scatter",
    mode: "lines",
    name: "Massachusetts",
    x: startDate_ME,
    y: rate_ME,
    line: {
      color: "black",
    },
  };

  var Michigan = {
    type: "scatter",
    mode: "lines",
    name: "Michigan",
    x: startDate_MI,
    y: rate_MI,
    line: {
      color: "lightgrey",
    },
  };

  var Minnesota = {
    type: "scatter",
    mode: "lines",
    name: "Minnesota",
    x: startDate_MN,
    y: rate_MN,
    line: {
      color: "#6666ff",
    },
  };

  var Mississippi = {
    type: "scatter",
    mode: "lines",
    name: "Mississippi",
    x: startDate_MS,
    y: rate_MS,
    line: {
      color: "lightbrown",
    },
  };

  var Missouri = {
    type: "scatter",
    mode: "lines",
    name: "Missouri",
    x: startDate_MO,
    y: rate_MO,
    line: {
      color: "#66ffff",
    },
  };

  var Montana = {
    type: "scatter",
    mode: "lines",
    name: "Montana",
    x: startDate_MT,
    y: rate_MT,
    line: {
      color: "gold",
    },
  };

  var Nebraska = {
    type: "scatter",
    mode: "lines",
    name: "Nebraska",
    x: startDate_NE,
    y: rate_NE,
    line: {
      color: "silver",
    },
  };

  var Nevada = {
    type: "scatter",
    mode: "lines",
    name: "Nevada",
    x: startDate_NV,
    y: rate_NV,
    line: {
      color: "maroon",
    },
  };

  var New_Hampshire = {
    type: "scatter",
    mode: "lines",
    name: "New Hampshire",
    x: startDate_NH,
    y: rate_NH,
    line: {
      color: "darkgreen",
    },
  };

  var New_Jersey = {
    type: "scatter",
    mode: "lines",
    name: "New Jersey",
    x: startDate_NJ,
    y: rate_NJ,
    line: {
      color: "pink",
    },
  };

  var New_Mexico = {
    type: "scatter",
    mode: "lines",
    name: "New Mexico",
    x: startDate_NM,
    y: rate_NM,
    line: {
      color: "#lightpink",
    },
  };

  var New_York = {
    type: "scatter",
    mode: "lines",
    name: "New York",
    x: startDate_NY,
    y: rate_NY,
    line: {
      color: "#darkpink",
    },
  };

  var North_Carolina = {
    type: "scatter",
    mode: "lines",
    name: "North Carolina",
    x: startDate_NC,
    y: rate_NC,
    line: {
      color: "#cccc00",
    },
  };

  var North_Dakota = {
    type: "scatter",
    mode: "lines",
    name: "North Dakota",
    x: startDate_ND,
    y: rate_ND,
    line: {
      color: "lightpurple",
    },
  };

  var Ohio = {
    type: "scatter",
    mode: "lines",
    name: "Ohio",
    x: startDate_OH,
    y: rate_OH,
    line: {
      color: "#005580",
    },
  };

  var Oklahoma = {
    type: "scatter",
    mode: "lines",
    name: "Oklahoma",
    x: startDate_OK,
    y: rate_OK,
    line: {
      color: " #e6ff99",
    },
  };

  var Oregon = {
    type: "scatter",
    mode: "lines",
    name: "Oregon",
    x: startDate_OR,
    y: rate_OR,
    line: {
      color: "#004d00",
    },
  };

  var Pennsylvania = {
    type: "scatter",
    mode: "lines",
    name: "Pennsylvania",
    x: startDate_PA,
    y: rate_PA,
    line: {
      color: "#660000",
    },
  };

  var Rhode_Island = {
    type: "scatter",
    mode: "lines",
    name: "Rhode Island",
    x: startDate_RI,
    y: rate_RI,
    line: {
      color: "#ffd480",
    },
  };

  var South_Carolina = {
    type: "scatter",
    mode: "lines",
    name: "South Carolina",
    x: startDate_SC,
    y: rate_SC,
    line: {
      color: "#008080",
    },
  };

  var South_Dakota = {
    type: "scatter",
    mode: "lines",
    name: "South Dakota",
    x: startDate_SD,
    y: rate_SD,
    line: {
      color: "#f9ecf2",
    },
  };

  var Tennessee = {
    type: "scatter",
    mode: "lines",
    name: "Tennessee",
    x: startDate_TN,
    y: rate_TN,
    line: {
      color: "#ffad99",
    },
  };

  var Texas = {
    type: "scatter",
    mode: "lines",
    name: "Texas",
    x: startDate_TX,
    y: rate_TX,
    line: {
      color: "#e68a00",
    },
  };

  var Utah = {
    type: "scatter",
    mode: "lines",
    name: "Utah",
    x: startDate_UT,
    y: rate_UT,
    line: {
      color: "#4dff4d",
    },
  };

  var Vermont = {
    type: "scatter",
    mode: "lines",
    name: "Vermont",
    x: startDate_VT,
    y: rate_VT,
    line: {
      color: "#aaff00",
    },
  };

  var Virginia = {
    type: "scatter",
    mode: "lines",
    name: "Virginia",
    x: startDate_VA,
    y: rate_VA,
    line: {
      color: "#1f3d7a",
    },
  };

  var Washington = {
    type: "scatter",
    mode: "lines",
    name: "Washington",
    x: startDate_WA,
    y: rate_WA,
    line: {
      color: "#001a4d",
    },
  };

  var West_Virginia = {
    type: "scatter",
    mode: "lines",
    name: "West Virginia",
    x: startDate_WV,
    y: rate_WV,
    line: {
      color: "#e6ffee",
    },
  };

  var Wisconsin = {
    type: "scatter",
    mode: "lines",
    name: "Wisconsin",
    x: startDate_WI,
    y: rate_WI,
    line: {
      color: "#cc2900",
    },
  };

  var Wyoming = {
    type: "scatter",
    mode: "lines",
    name: "Wyoming",
    x: startDate_WY,
    y: rate_WY,
    line: {
      color: "#001a00",
    },
  };
  var apiReturn1 = [
    Alabama,
    Alaska,
    Arizona,
    Arkansas,
    California,
    Colorado,
    Connecticut,
    Delaware,
    Florida,
    Georgia,
    Hawaii,
    Idaho,
    Illinois,
    Indiana,
    Iowa,
    Kansas,
    Kentucky,
    Louisiana,
    Maine,
    Maryland,
    Massachusetts,
    Michigan,
    Minnesota,
    Mississippi,
    Missouri,
    Montana,
    Nebraska,
    Nevada,
    New_Hampshire,
    New_Jersey,
    New_Mexico,
    New_York,
    North_Carolina,
    North_Dakota,
    Ohio,
    Oklahoma,
    Oregon,
    Pennsylvania,
    Rhode_Island,
    South_Carolina,
    South_Dakota,
    Tennessee,
    Texas,
    Utah,
    Vermont,
    Virginia,
    Washington,
    West_Virginia,
    Wisconsin,
    Wyoming,
  ];

  var layout1 = {
    title: `Insured Unemployment Rate`,
    xaxis: {
      range: [startDate],
      title: "Date",
    },
    yaxis: {
      autorange: true,
      type: "linear",
      title: "Unemployent Rate ",
    },
  };

  Plotly.newPlot((id = "plot1"), apiReturn1, layout1);
}

// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);
