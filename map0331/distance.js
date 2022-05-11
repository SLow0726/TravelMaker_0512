function distance() {
  const service = new google.maps.DistanceMatrixService();
  const origin = [];
  const destination = [];
  const originList = [];
  const destinationList = [];
 

  for (let i = 0; i < attractionShowArray.length - 1; i++) {
    const attrs = attractionShowArray[i][1].split(", ");
    origin.push(attrs);
    originList.push({ lat: Number(attrs[0]), lng: Number(attrs[1]) })
  }
  for (let i = 1; i < attractionShowArray.length; i++) {
    const attrs = attractionShowArray[i][1].split(", ");
    destination.push(attrs);
    destinationList.push({ lat: Number(attrs[0]), lng: Number(attrs[1]) })
  }
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


  const request = {
    origins: originList,
    destinations: destinationList,
    travelMode: travelMode,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };



  service.getDistanceMatrix(request).then((response) => {

    distanceData.length = 0;
    distanceDataLandscape.length = 0;
    for (let i = 0; i < response.rows.length; i++) {
      //attractionData['distanceData'+i.toString()] = response.rows[i].elements[i];
      distanceData.push(response.rows[i].elements[i]);
      distanceDataLandscape.push(response.rows[i].elements[i]);
      //console.log(response.rows[i].elements[i])
    }

    console.log(distanceData)
    travelData['distanceData'] = distanceData;



  });
}

