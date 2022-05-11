let map;
let town;
let clickIndex;
let oldClickIndex;
const tainanAreas = {};
const areaAttractions = [];
const directionsPoints = {};


fetch('./mapcenter.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    //console.log(myJson[0]);


    for (let i = 0; i < myJson.length; i++) {
      //var arrayCoordinate = myJson.
      //tainanAreas.push(myJson[i]);
      tainanAreas[myJson[i].mcName] = myJson[i].mcPosition

      // .mcName , Number(myJson[i].mcPosition.split(', ')[0]) , Number(myJson[i].mcPosition.split(', ')[1])]

    }
    //console.log(tainanAreas);
    //console.log(tainanAreas);

  });
fetch('./attraction.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {

    //console.log(myJson)
    for (let i = 0; i < myJson.length; i++) {

      areaAttractions.push([myJson[i].attractionDistrict, myJson[i].attrName, myJson[i].position, myJson[i].attractionInfo])
      //[myJson[i].attractionDistrict]=(myJson[i].attrName);

    }
    //console.log(areaAttractions)



  });

function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: "red",
      strokeWeight: 10,
      suppressMarkers: true,
    }
  });






  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 23.126094, lng: 120.2971195 },
    //disableDefaultUI: true,
    //gestureHandling: 'none', //不能拖曳、放大縮小
    zoomControl: true,
    zoomControlOptions: {
      position: 1,
    },
    scaleControl: true,
    mapTypeControl: false,

    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  });
  addScript("polygon.js");
  addScript("setMarkerOnAll.js");
  addScript("calculateAndDisplayRoute.js");
  //addScript("distance.js");
  //distance();

  const onChangeHandler = function () {
    if (attractionNameArray.length >= 2) {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
      directionsRenderer.setMap(map);

      distance();

    } else {
      directionsRenderer.setMap(null);
    }

  };




  //document.getElementById("start").addEventListener("click", onChangeHandler);
  //console.log(attractionNameArray);


}

function addScript(url) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', url);
  document.body.appendChild(script);

}

function distance() {
  const service = new google.maps.DistanceMatrixService();
  const origin = [];
  const destination = [];
  const originList = [];
  const destinationList = [];
  for (let i = 0; i < attractionShowArray.length-1; i++) {
    const attrs = attractionShowArray[i][1].split(", ");
    origin.push(attrs);
    originList.push({ lat: Number(attrs[0]), lng: Number(attrs[1]) })
  }
  for (let i = 1; i < attractionShowArray.length; i++) {
    const attrs = attractionShowArray[i][1].split(", ");
    destination.push(attrs);
    destinationList.push({ lat: Number(attrs[0]), lng: Number(attrs[1]) })
  }



  const request = {
    origins: originList,
    destinations: destinationList,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };



  service.getDistanceMatrix(request).then((response) => {
    console.log(response.rows)

    

    for (let i = 0; i < response.rows.length; i++) {
      
      console.log(response.rows[i].elements[i])
    }
  });
}

// 動態生成左邊小區塊
var i = -1;
function creatediv(data) { //參數 creatediv(data) = creatediv(attractionNameArray)
  i += 1;
  // 建立最裡層父級<div>
  //在<div>標籤裡面添加class屬性，<div class="title_box"></div>
  var title_box = $('<div></div>');
  title_box.addClass('title_box');

  // 建立子級<p>
  // 在<p>標籤裡面添加class屬性，<p class="title"></p>
  var title =$('<p></p>');
  title.addClass('title');

  //把抓到的值，丟到html裡面的內容
  title.html(data[i]);

  // 建立子級<i>
  // 在<i>標籤裡面添加class屬性，<i class="fa-solid fa-xmark"></i>
  var x = $('<i></i>');
  x.addClass('fa-solid fa-xmark');
  
  // 將子級<p>,<i>標籤加到最裡層父級<div>
  title.appendTo(title_box);
  x.appendTo(title_box);
  
  // 建立第二個<p>標籤
  // 在<p>標籤裡面添加class屬性，<p class="content"></p>
  var content = $('<p></p>');
  content.addClass('content');
  
  // 建立最外層父級<div>
  // 在最外層父級<div>標籤裡面添加class屬性，<div class="left_box"></div>
  var left_box =$('<div></div>');
  left_box.addClass('left_box');

  // 最後將子級<div>,<p>新增到最外層父級<div>
  title_box.appendTo(left_box);
  content.appendTo(left_box);

  // 把<div class="left_box">標籤添加到<div class="left_content">標籤裡面
  left_box.appendTo('.left_content');


  //動態生成div之後，執行這段的jQuery程式碼
  $(function(){
    //點擊叉叉按鈕時，刪除該區塊
    $(".title_box > i").click(function(){
      let index = $(this).parents(".left_box").index();
      console.log(index);
      $(this).parents(".left_box").remove();
    });
  })
}






