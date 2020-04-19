// State selection

console.log(stateData);

pullDownMenu();

/**
 * 
 * @param {var} value. This function creates array of options using the array of values in @param 
 */

function pullDownMenu() {

  var dropdown = d3.select("#selState");
  // Log the entire dataset

    // For each ID in the array run a function
    stateData.forEach((element) => {
        console.log(element);
        // Append an option element to the #selDataset dropdown with the id
        // in the value attribute as well as text between the open and closed tags.
        dropdown.append('option')
            .attr("value", element.abbr)
            .text(element.state);
    });  

};

/**
 * When the select dropdown is changed this function will fire
 * @param {Number} selectedValue This is the selected id in the pulldow from #selDataset.
 */

function optionChanged() {
    /**
     * collect selected values
     * 
     */
      var selValues = [];
      selValues.push($('#selState').val()); 
      console.log(selValues);
      d3.select("#h-pulldown").text("");
      d3.select("#h-pulldown").text(selValues);
      
              
      console.log(`You changed the value. It is now: ${selValues}`);
     
};
        
