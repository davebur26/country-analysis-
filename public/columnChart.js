var GraphData = function(name, y){
  this.name = name,
  this.y = y,
  this.sliced = false
}

var columnChartDataCreator = function(countriesArray,dataTypes){
  var categories = []
  var dataSetObject = []

  for( var dataType of dataTypes){
    var data = []

    for( var countries of countriesArray){
      console.log(dataType, countries[dataType])
      data.push(countries[dataType])
      if (!categories.includes(countries.name)){
        categories.push(countries.name)
      }
    }

    dataSetObject.push(new GraphData(categories, data))
  }
  return dataSetObject
}

var createColumnChart = function(data) {

  var chart = new Highcharts.Chart({
    chart: {
      // type: 'column',
      renderTo: document.querySelector('div#column-chart')
    },
    title: {
      text: "Population of Counties which border "
    },
    yAxis: [{
      title: {
          text: 'Population',
        },
      opposite: true
      },
      {
        title: {
            text: 'Area (km2)',
          },
        opposite:false
      }],

    series: [
      {
      name: 'Population',
      type: 'column',
      yAxis: 0,
      data: data[0].y
    },
      {
      name: 'Area',
      type: 'column',
      yAxis: 1,
      data: data[1].y
      }
    ],
    xAxis: {
      categories: data[0].name
    }
  })
}
