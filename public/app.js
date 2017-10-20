var url = 'https://restcountries.eu/rest/v2/all'

var initialize = function(){
  makeRequest(url)

}

var render = function(countries) {

  addCountriesToDropDown(countries)

  var selectCountry = function() {
    var selectedCountryName = this.value;
    findCountryObject(selectedCountryName, countries)
  }

  var findCountryObject = function(countryName, countries) {
    for(var country of countries){
      if(country.name === countryName){
        // console.log(country.borders);
        processBorderCountries(country.borders, countries)
      }
    }
  }

  var findCountryByThreeLet = function(countryThreeLet, countries) {
    for(var country of countries){
      if (country.alpha3Code === countryThreeLet){
        return country
      }
    }
  }

  var selectMainDD = document.getElementById("drop-down")
  selectMainDD.addEventListener("change", selectCountry);

  var processBorderCountries = function (countryBorders, countries) {
    var borderCountriesFull = []

    for ( var countryNameShortCut of countryBorders){
      var country = findCountryByThreeLet(countryNameShortCut, countries)
      borderCountriesFull.push(country)
    }
    console.log(borderCountriesFull);
  }



}




var makeRequest = function( url ) {
  var request = new XMLHttpRequest()
  request.open( "GET" , url )
  request.addEventListener( "load", function(){
    var countries = JSON.parse( this.responseText ) || []
    render(countries)

  })
  request.send()
}

var addCountriesToDropDown = function(countries) {
  var dropDown = document.getElementById("drop-down")
  for (var country of countries){
    var option = document.createElement("option")
    option.innerHTML = country.name
    dropDown.appendChild(option)
  }
}




window.addEventListener("load", initialize);
