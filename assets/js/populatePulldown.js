// State selection
states=[];

// read the data
stateData.forEach((s) => {
  states.push(s.state);
});
console.log(states);


pullDownMenu(states);

/**
 * 
 * @param {var} value. This function creates array of options using the array of values in @param 
 */

function pullDownMenu(value) {

  var dropdown = d3.select("#selState");
  // Log the entire dataset
  console.log(value);


    // For each ID in the array run a function
  value.forEach((element) => {
      console.log(element);
      // Append an option element to the #selDataset dropdown with the id
      // in the value attribute as well as text between the open and closed tags.
      dropdown.append('option')
          .attr("value", element)
          .text(element);
  });

};
  
