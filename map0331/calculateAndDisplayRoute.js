function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  var waypts = [];


  //console.log(attractionShowArray)

  //attractionShowArray = attractionAfterDragList;
  //console.log(attractionAfterDragList)


  if (attractionShowArray.length > 2) {
    for (let i = 1; i < attractionShowArray.length - 1; i++) {
      const point = attractionShowArray[i][1].split(", ")
      waypts.push({
        location: {
          lat: Number(point[0]), lng: Number(point[1])
        },
        stopover: true
      })

    }

  }
  const startPoint = attractionShowArray[0][1].split(", ")
  const pointCount = attractionShowArray.length - 1
  const endPoint = attractionShowArray[pointCount][1].split(", ")



  switch (mode) {
    case 0:
      travelMode = google.maps.TravelMode.DRIVING
      break;
    case 1:
      travelMode = google.maps.TravelMode.WALKING
      break;
    default:
      travelMode = google.maps.TravelMode.BICYCLING
      break;
  }


  directionsService
    .route({

      origin: {
        //query: document.getElementById("start").value,
        lat: Number(startPoint[0]), lng: Number(startPoint[1])
      },

      destination: {
        //query: document.getElementById("end").value,
        lat: Number(endPoint[0]), lng: Number(endPoint[1])
      },
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: travelMode,

    })
    .then((response) => {
      directionsRenderer.setDirections(response);
      var btn = document.querySelector('.deleteBox');
      btn.addEventListener('click', deleteAll);
      function deleteAll() {
        directionsRenderer.setMap(null)
      }
    })
    .catch((e) => window.alert("Directions request failed due to " + status));

  setMapOnAll(null);
}


