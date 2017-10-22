var MapWrapper = function (map, coords, zoom) {
  this.googleMap = new google.maps.Map(map, {
    center: coords,
    zoom: zoom
  })
  this.markers = []

}

MapWrapper.prototype.addMapChange = function(country) {
  var coords = new google.maps.LatLng(country.latlng[0], country.latlng[1])
  this.googleMap.setCenter(coords)
  var zoom = (13.769 * Math.pow(country.area, -0.094)).toFixed(4)
  this.googleMap.setZoom(zoom)
}

MapWrapper.prototype.addMarker = function(coords, country){
  var image = {
    url:  country.flag,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(25, 0),
    scaledSize: new google.maps.Size(50, 25)
  };

  var marker = new google.maps.Marker({
    position: coords,
    icon: image,
    map: this.googleMap
  })
  this.markers.push(marker)
}

MapWrapper.prototype.addTwoCountriesToMap = function(twoCountries){
  var coordsA = new google.maps.LatLng(twoCountries[0].latlng[0],twoCountries[0].latlng[1])
  var coordsB = new google.maps.LatLng(twoCountries[1].latlng[0],twoCountries[1].latlng[1])
  this.addMarker(coordsA, twoCountries[0])
  this.addMarker(coordsB, twoCountries[1])

  var bound = new google.maps.LatLngBounds();

  for (var i in this.markers) {
  bound.extend(this.markers[i].getPosition());
  }
  this.googleMap.fitBounds(bound);

  var lineSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
        };

  var line1 = new google.maps.Polyline({
    path: [coordsA, new google.maps.LatLng(0, twoCountries[0].latlng[1])],
    icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
    geodesic: true,
    map: this.googleMap
  });

  var line2 = new google.maps.Polyline({
    path: [coordsB, new google.maps.LatLng(0, twoCountries[1].latlng[1])],
    icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
    geodesic: true,
    map: this.googleMap
  });

}
