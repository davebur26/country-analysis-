var url = 'https://restcountries.eu/rest/v2/all'

var initialize = function(){
  makeRequest(url)
}

var render = function(countries) {

  var countriesTwo = setupCountries(countries)

  var button = document.querySelector("button")
  button.addEventListener("click", function(){
    processAnswers(countriesTwo)
  })

  var answer = function(countries, parameter){


    if (parameter === "borders"){
      if (countries[0][parameter].length === countries[1][parameter].length){
        return "draw"
      } else if (countries[0][parameter].length > countries[1][parameter].length){
        return countries[0]
      } else {
        return countries[1]
      }
    }

    if (parameter === "equator"){
      var countryA = Math.abs(countries[0].latlng[0])
      var countryB = Math.abs(countries[1].latlng[0])

      if (countryA === countryB){
        return "draw"
      } else if (countryA < countryB){
        return countries[0]
      } else if(countryA > countryB){
        return countries[1]
      }
    }

    if (countries[0][parameter] > countries[1][parameter]){
      return countries[0]
    } else if(countries[0][parameter] < countries[1][parameter]){
      return countries[1]
    }
  }



  var processAnswers = function(countriesTwo){

    var popTag = document.getElementById('popResult')
    var areaTag = document.getElementById('areaResult')
    var bordersTag = document.getElementById('borderResult')
    var equatorTag = document.getElementById('equatorResult')

    var form = document.getElementById('answers');

    var populationSelected = form.elements["population"][0].checked
    var areaSelected = form.elements["area"][0].checked
    var bordersSelected = form.elements["borders"][0].checked
    var equatorSelected = form.elements["equator"][0].checked

    var populationAnswer = answer(countriesTwo,"population")
    var areaAnswer = answer(countriesTwo,"area")
    var bordersAnswer = answer(countriesTwo,"borders")
    var equatorAnswer = answer(countriesTwo,"equator")

    if (populationSelected === true && populationAnswer === countriesTwo[0]){
      popTag.innerText = "Correct"
      popTag.style.color = "green"
    } else if (populationSelected === false && populationAnswer === countriesTwo[1]){
      popTag.innerText = "Correct"
      popTag.style.color = "green"
    } else {
      popTag.innerHTML = "False"
      popTag.style.color = "red"
    }

    if (areaSelected === true && areaAnswer === countriesTwo[0]){
      areaTag.innerText = "Correct"
      areaTag.style.color = "green"
    } else if (areaSelected === false && areaAnswer === countriesTwo[1]){
      areaTag.innerText = "Correct"
      areaTag.style.color = "green"
    } else {
      areaTag.innerHTML = "False"
      areaTag.style.color = "red"
    }

    if (bordersAnswer === "draw"){
      bordersTag.innerText = "Correct"
      bordersTag.style.color = "green"
    } else if (bordersSelected === true && bordersAnswer === countriesTwo[0]){
      bordersTag.innerText = "Correct"
      bordersTag.style.color = "green"
    } else if (bordersSelected === false && bordersAnswer === countriesTwo[1]){
      bordersTag.innerText = "Correct"
      bordersTag.style.color = "green"
    } else {
      bordersTag.innerHTML = "False"
      bordersTag.style.color = "red"
    }

    if (equatorAnswer === "draw"){
      equatorTag.innerText = "Correct"
      equatorTag.style.color = "green"
    } else if (equatorSelected === true && equatorAnswer === countriesTwo[0]){
      equatorTag.innerText = "Correct"
      equatorTag.style.color = "green"
    } else if (equatorSelected === false && equatorAnswer === countriesTwo[1]){
      equatorTag.innerText = "Correct"
      equatorTag.style.color = "green"
    } else {
      equatorTag.innerHTML = "False"
      equatorTag.style.color = "red"
    }

    var popRadioTagA = document.getElementById('popA')
    popRadioTagA.innerHTML = countriesTwo[0].population
    var popRadioTagB = document.getElementById('popB')
    popRadioTagB.innerHTML = countriesTwo[1].population

    var areaRadioTagA = document.getElementById('areaA')
    var squared = 2
    areaRadioTagA.innerHTML = countriesTwo[0].area + " km\xB2"
    var areaRadioTagB = document.getElementById('areaB')
    areaRadioTagB.innerHTML = countriesTwo[1].area + " km\xB2"

    var bordersRadioTagA = document.getElementById('bordersA')
    bordersRadioTagA.innerHTML = countriesTwo[0].borders.length
    var bordersRadioTagB = document.getElementById('bordersB')
    bordersRadioTagB.innerHTML = countriesTwo[1].borders.length

    var equatorRadioTagA = document.getElementById('equatorA')
    equatorRadioTagA.innerHTML = Math.round(countriesTwo[0].latlng[0] * 100)/100 + " \xB0"
    var equatorRadioTagB = document.getElementById('equatorB')
    equatorRadioTagB.innerHTML = Math.round(countriesTwo[1].latlng[0] * 100)/100 + " \xB0"

    createMap(countriesTwo)
  }

  var createMap = function(country){
    var mapDiv = document.getElementById('main-map')
    var center = {
      lat: country[0].latlng[0],
      lng: country[0].latlng[1]
    }
    var mainMap = new MapWrapper(mapDiv, center, 1)
    mainMap.addTwoCountriesToMap(country)
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

var randomCountrySelect = function(countries){
  randomNum = Math.floor(Math.random() * countries.length)
  countries.splice(randomNum,1)
  return countries[randomNum]
}

var setupCountries = function(countries){
  var countryATag = document.querySelector("#countryA")
  var countryAImgTag = document.querySelector("#countryAImg")
  var countryBTag = document.querySelector("#countryB")
  var countryBImgTag = document.querySelector("#countryBImg")


  countriesCopy = countries
  countryA = randomCountrySelect(countriesCopy)
  countryB = randomCountrySelect(countriesCopy)
  console.log(countryB.flag);

  countryATag.innerHTML = countryA.name
  countryAImgTag.src = countryA.flag
  console.log(countryA.flag);
  countryBTag.innerHTML = countryB.name
  countryBImgTag.src = countryB.flag

  return [countryA, countryB]
}

window.addEventListener("load", initialize);
