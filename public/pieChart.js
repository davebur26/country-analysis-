var pieChartDataCreator = function(countriesArray){
  var data = []
  for( var countries of countriesArray){
    var object = new GraphData(countries.name, countries.population)
    data.push(object)
  }
  data[0].sliced = true
  return data
}

var createPieChart = function (data) {
  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: document.querySelector('div#pie-chart')
    },
    title: {
      text: "Population of Counties which border " + data[0].name
    },
    series: [{
      name: 'Country',
      data: data
    }]
  })
}
