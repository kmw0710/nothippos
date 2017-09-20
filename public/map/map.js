//initiates the google map function, which pastes our map with the following default values
function initMap() {

  //create a new instance of Geocoder
  var geocoder = new google.maps.Geocoder();

  //dummy data for testing that map is plotting these things
  var dillon = '1107 Fiesta St, Austin, TX 78702';
  var hackreact = {lat: 40.7505, lng: -73.9764};
  var london = {lat: 51.5074, lng: -0.1278};
  var dallas = {lat: 32.7767, lng: -96.7970};
  var houston = {lat: 29.7604, lng: -95.3698};
  var austin = {lat: 30.2672, lng: -97.7431};

  var coordsForPolyline = [];
  var options = {
  zoom: 2,
  center: {lat: 37.7428, lng: -35.6806} // || coordsForPolyline[coordsForPolyline.length-1]
  };

  var map = new google.maps.Map(document.getElementById('map'), options);

  function getCoordinates( address, callback ) {
    var coords;
    geocoder.geocode({address: address}, function(results, status) {
      if (status === 'OK') {
        coords_object = results[0].geometry.bounds;
        //the coordinates are averaged because when only the city is entered,
        //two sets of coordinates are returned in the geocode object
        //and the average is closest to the center of the city
        coords = { lat: (coords_object.f.b + coords_object.f.f) / 2,
                   lng: (coords_object.b.b + coords_object.b.f) / 2};
        callback(coords)
      } else {
        alert('Please insert a city located on the planet Earth.', status)
      }
    })
    return coords; //I don't know that this is actually needed
  }

  //click 'Add' --> city coordinates are pushed to markers array, marker is added
  // document.getElementById('WHAT_WE_CALL_OUR_ADD_BUTTON').addEventListener('click', function() {
    getCoordinates( /*CITY_PULLED_FROM_INPUT_ BOX --> Paris is dummy -->*/'houston, Texas', function(coords) {
      markers.push({
          coordinates: coords,
          content: '<h1> PULL ME FROM USER INPUT CITYSCHEMA TAGS </h1>'
        });
        addMarker(markers[markers.length-1]);

        //add coordinates to array for polyline creation
        coordsForPolyline.push(coords)
        //create new polyline
        var newTravelPath = new google.maps.Polyline({
          path: coordsForPolyline,
          geodesic: true,
          strokecolor:'#FF000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        })
        //set polyline on map
        newTravelPath.setMap(map);
    })
  // })

  //adds a marker
  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coordinates,
      map: map
    });

    //checks if we have content, if so adds pop up with the content
    if (props.content) {
      //creates info window with content that we'll pull from our user input
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      //listens on click --> info window pops up
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
    }
  }

  var markers = [
    {
      coordinates: dallas,
      content: '<h1> PULL ME FROM USER INPUT CITYSCHEMA TAGS </h1>'
    },
    {
      coordinates: houston,
      content: '<h1> PULL ME FROM USER INPUT CITYSCHEMA TAGS </h1>'
    },
  ];

  //push user inputs into markers array --
  for (var i = 0; i < markers.length; i++) {
    addMarker(markers[i]);
    coordsForPolyline.push(markers[i].coordinates)
  }

}
