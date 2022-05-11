var map;
let town;
let clickIndex;
let oldClickIndex;
const tainanAreas = {};
const areaAttractions = [];
const directionsPoints = {};
var attractionData = {};
const mode = 0;
var travelMode;
var coverDataList = [];
var travelData = {};
var distanceData = [];
var dragIndexList = [];
var isAdd = false;
var userID;
var user_Info;
var attractionNameArray = [];
var attractionShowArray = [];
var attractionIndexList = [];
var tempAttractionId;               //0402宣告一個全域變數
var divAttractionNameArray = [];    //宣告一個全域的空陣列
var divAttractionNameDelete = [];
var divCount = -1;
var directionsService;
var directionsRenderer
var id;
var dynamicArea = [];
var dynamicAreaPosition = [];
var attractionOwner;
var attractionOwnerList = [];
var travelTitle = '';
var userTravelIndexList = [];
var distanceDataLandscape = [];
var showDistanceDataLandscape = [];
var polygonPath = []; // 繪製後的多邊形陣列


function initMap() {
    addScript("./map0331/distance.js");
    addScript("./map0331/getAttractionData.js");
    addScript("./map0331/setMarkerOnAll.js");
    addScript("./map0331/calculateAndDisplayRoute.js");
    addScript("./map0331/polygon.js");
    addScript("./home/js/map.js");
    addScript("./public/js/cookies.js");
    addScript("./map0331/postAttractionData.js");



    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
            strokeColor: "red",
            strokeWeight: 5,
            suppressMarkers: true,
        }
    });

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: { lat: 23.126094, lng: 120.2971195 },
        //disableDefaultUI: true,
        gestureHandling: 'none', //不能拖曳、放大縮小
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
    user_Info = $.parseJSON($.cookie('user_Info'))
    userID = getCookieToJson("user_Info", "user_Id")
    attractionOwnerList.push(user_Info.travelOwner)

    console.log(user_Info)



    id = getQueryVariable("id")
    console.log(id)
    var accId = 0;

    if (id != false) {
        var accId = Number(id);
        getFavoriteData(accId, directionsService, directionsRenderer);
        console.log("有ID")
        console.log(accId)
    }
    else {
        console.log("沒ID")
        if (user_Info.userTravel != null) {
            userTravelIndexList = user_Info.userTravel.split(',');
            console.log(userTravelIndexList)
            getUserTravelData(userTravelIndexList, directionsService, directionsRenderer);
        }


    }
    //console.log(accId)
    const postData = function () {
        if (accId != 0) {

            editTravel(accId);

            travelTitle = $('.userEnter input').val();
        }
        else {
            console.log(user_Info)
            distance();
            getAttractionData(attractionShowArray);

            addNewTravel();
            //console.log(attractionOwner)

            travelTitle = $('.userEnter input').val();

            renewAccountDetail(attractionOwner);
            user_Info.userTravel = null;
            //$.removeCookie('userTravel');
            // user_Info.travelOwner = accId
            // $.cookie('user_Info', JSON.stringify(user_Info))
        }
    }





    document.getElementById("btnLogin").addEventListener("click", postData);

}

function addScript(url) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', url);
    document.body.appendChild(script);
}


function getAttractionData(attractionShowArray) {

    delete travelData.attractionData;
    travelData['attractionData'] = attractionShowArray;
    console.log(travelData)

}

function getFavoriteData(userID, directionsService, directionsRenderer) {

    function tData(attractionNameArray, callback) {
        setTimeout(callback, 1000, attractionNameArray)
    }
    function callbackData(attractionNameArray) {
        fetch('http://20.210.96.122/api/Travel/gettravel')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);

                for (let i = 0; i < myJson.length; i++) {
                    if (myJson[i].travel_Id == userID) {
                        attractionIndexList = JSON.parse(myJson[i].attractionReferral);
                        attractionShowArray = JSON.parse(myJson[i].travelMap);
                        let nameList = JSON.parse(myJson[i].travelMap)
                        for (let j = 0; j < nameList.length; j++) {
                            attractionNameArray.push(nameList[j][0]);
                        }

                        //console.log(attractionNameArray)
                    }

                }

            })
            .then(function () {

                if (userID != null) {

                    for (let i = 0; i < attractionNameArray.length; i++) {
                        console.log(attractionNameArray)
                        $(function () {
                            $(".banner .left").show('slide');
                            $(".banner .main").removeClass("main_w99");
                            $(".banner .main").addClass("main_w80");
                        })
                        tempAttractionId = attractionNameArray[i];
                        console.log(i)
                        isAdd = true;
                        creatediv();

                    }

                    editDisplayRoute(directionsService, directionsRenderer);
                }

            });

    }
    tData(attractionNameArray, callbackData)
}

function getUserTravelData(userTravelIndexList, directionsService, directionsRenderer) {

    function tData(attractionNameArray, callback) {
        setTimeout(callback, 1000, attractionNameArray)
    }
    function callbackData(attractionNameArray) {
        fetch('http://20.210.96.122/api/Attraction/GetAttractionDetail')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {

                console.log(myJson)
                for (let i = 0; i < myJson.length; i++) {
                    for (let j = 0; j < userTravelIndexList.length; j++) {
                        if (myJson[i].attr_Id == Number(userTravelIndexList[j])) {
                            attractionIndexList.push(myJson[i].attr_Id);
                            attractionShowArray.push(
                                [myJson[i].attrName, myJson[i].position]
                            );
                            attractionNameArray.push(myJson[i].attrName)


                            console.log(attractionNameArray)
                        }

                    }


                }

            })
            .then(function () {

                if (userID != null) {

                    for (let i = 0; i < attractionNameArray.length; i++) {
                        console.log(attractionNameArray)
                        $(function () {
                            $(".banner .left").show('slide');
                            $(".banner .main").removeClass("main_w99");
                            $(".banner .main").addClass("main_w80");
                        })
                        tempAttractionId = attractionNameArray[i];
                        console.log(i)
                        isAdd = true;
                        creatediv();

                    }

                    editDisplayRoute(directionsService, directionsRenderer);
                }

            });

    }
    tData(attractionNameArray, callbackData)
}

function editDisplayRoute(directionsService, directionsRenderer) {
    if (attractionNameArray.length >= 2) {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
        directionsRenderer.setMap(map);

        distance();
        getAttractionData(attractionShowArray);
        //editTravel(id);
        //editTravel(33);

    } else {
        directionsRenderer.setMap(null);
    }

};

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}