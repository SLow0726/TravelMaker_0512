const labels = "";
let labelIndex = 0;
let markers = [];
let travelCount = 0;



let img;

function setMarkers(map, infowindowAreas, areaName) {


    deleteMarkers();
    // const shape = {
    //   coords: [1, 1, 1, 20, 18, 20, 18, 1],
    //   type: "poly",
    // };


    for (let i = 0; i < areaAttractions.length; i++) {
        if (areaAttractions[i][0] == areaName) {
            //const attractionName = areaAttractions[i][0];
            const attraction = areaAttractions[i][2].split(', ');
            //console.log(areaAttractions[i])
            const marker = new google.maps.Marker({
                position: { lat: Number(attraction[0]), lng: Number(attraction[1]) },
                map,
                animation: google.maps.Animation.DROP
                //label: labels[labelIndex++ % labels.length],
                //icon: image,
                //title: areaAttractions[i][1],
                //shape: shape,
                //title: attraction[0],
            })

            marker.addListener("mouseover", () => {
                img = coverDataList[i];
                infowindowAreas.setContent(
                    '<div>' +
                    '<div style="width:300px;height:140px;">' +
                    '<img src=http://20.210.96.122/api/Image/GetImage?imgName=' + img +
                    ' alt="相片" style="position: absolute; top: 30%;left: 50%;width: 340px;height: 150px;-webkit-transform: translateY(-50%) translateX(-50%);transform: translateY(-50%) translateX(-50%);">' +
                    '</img></div>' +
                    '<div style="height:40px;width:100%">' +
                    '<h6>' + areaAttractions[i][1] + '</h6>' +
                    '</div>' +
                    //'<span jstcache="847" class="DVeyrd gm2-hairline-border section-action-chip-button" jsan="7.DVeyrd,7.gm2-hairline-border,7.section-action-chip-button"><img alt="規劃路線" draggable="false" jstcache="848" src="//www.gstatic.com/images/icons/material/system/1x/directions_gm_blue_18dp.png" class="EgL07d" jsan="7.EgL07d,0.alt,8.src,0.draggable"><span jstcache="849" style="display:none"></span></span>'+
                    '</div>'
                );

                infowindowAreas.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                });
                infowindowAreas.setOptions({
                    disableAutoPan : true
                })
            });
            marker.addListener("mouseout", () => {
                setTime(infowindowAreas);
                // infowindowAreas.setPosition(null);
            });
            marker.addListener("click", (e) => {


                //0402 把得到的值儲存到全域變數裡面，這樣其他地方就可以調用到這個值
                tempAttractionId = areaAttractions[i][1];
                console.log(tempAttractionId);


                if (attractionNameArray.indexOf(areaAttractions[i][1]) > -1) {
                    const index = attractionNameArray.indexOf(areaAttractions[i][1]);


                    //console.log($(".left_box .title").text())
                    $(".left_box .title").text()

                    //$( ".left_box" ).find( "title" ).css( "background-color", "red" )
                    attractionNameArray.splice(index, 1);
                    attractionShowArray.splice(index, 1);
                    attractionIndexList.splice(index, 1);

                    console.log("已經有了")
                    isAdd = false;
                    //console.log(attractionNameArray);
                } else {
                    attractionNameArray.push(areaAttractions[i][1]);
                    attractionShowArray.push(
                        [areaAttractions[i][1], areaAttractions[i][2]]
                    );
                    attractionIndexList.push(i);


                    divAttractionNameDelete.push(areaAttractions[i][1]);

                    isAdd = true;
                }
                console.log(attractionNameArray);
                //console.log(attractionShowArray);
                //onChangeHandler
                //onChangeHandler();

                //onChangeHandler;
                //0404修改_點擊座標後，出現左邊小框框
                $(function () {
                    $(".banner .left").show('slide');
                    $(".banner .main").removeClass("main_w99");
                    $(".banner .main").addClass("main_w80");
                })

                //0330_把attractionNameArray的資料抓到creatediv方法裡面
                creatediv();

                //marker.setLabel(attractionNameArray.length.toString());
                if (attractionNameArray.length >= 2) {
                    calculateAndDisplayRoute(directionsService, directionsRenderer);
                    directionsRenderer.setMap(map);
                    distance();
                }
                else {
                    directionsRenderer.setMap(null);
                }
            });
            markers.push(marker);
        }
    }
}


function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function hideMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    hideMarkers();
    markers = [];
}

// 0330_動態生成左邊小區塊
// var divCount = -1;

function creatediv() { //參數 creatediv(data) = creatediv(attractionNameArray)
    if (isAdd) {
        divCount += 1;


        //0402修改+_每點擊一次座標，就把該座標名稱添加到divAttractionNameArray陣列裡面

        divAttractionNameArray.push(tempAttractionId);

        //alert('沒有重複的資料');

        // 建立最裡層父級<div>
        //在<div>標籤裡面添加class屬性，<div class="title_box"></div>
        var title_box = $('<div></div>');
        title_box.addClass('title_box');

        // 建立子級<p>
        // 在<p>標籤裡面添加class屬性，<p class="title"></p>
        var title = $('<p></p>');
        title.addClass('title');

        //把抓到的值，丟到html裡面的內容
        title.html(divAttractionNameArray[divCount]);

        //var name = data[i];

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

        var txtTitle = $('<dvi></div>');
        var txt = $('<dvi></div>');
        var distance = $('<dvi></div>');
        var time = $('<dvi></div>');

        txtTitle.addClass('landscape_txtTitle');
        txt.addClass('landscape_txt');
        distance.addClass('landscape_distance');
        time.addClass('landscape_time');

        txtTitle.appendTo(content);
        txt.appendTo(content);
        distance.appendTo(content);
        time.appendTo(content);

        txtTitle.html(divAttractionNameArray[divCount]);
        //txt.html('http://127.0.0.1:5502/attraction_detail.html?id=21');
        callDistance(distanceDataLandscape);
        //console.log(showDistanceDataLandscape)

        //distance.html(123131);


        //time.html();


        //0401修改_加入景點時內容先影藏
        $(function () {
            $(".left_box > p").hide();
        })

        // 建立最外層父級<div>
        // 在最外層父級<div>標籤裡面添加class屬性，<div class="left_box"></div>
        var left_box = $('<div></div>');
        left_box.addClass('left_box');

        // 最後將子級<div>,<p>新增到最外層父級<div>
        title_box.appendTo(left_box);
        content.appendTo(left_box);

        // 把<div class="left_box">標籤添加到<div class="left_content">標籤裡面
        left_box.appendTo('.left_content');

        //動態添加id屬性
        //先用querySelectorAll選取全部，class屬性名為left_box的標籤
        //再用 .setAttribute('id', ""+ 變數 +""); 添加id屬性及屬性名
        var createID = document.querySelectorAll('.left_box');
        createID[divCount].setAttribute('id', "" + divCount + "");

        var createIid = document.querySelectorAll('.fa-xmark');
        createIid[divCount].setAttribute('id', "i" + divCount + "");

        isAdd = false;
    }
    else {

        let index = $.inArray(tempAttractionId, divAttractionNameDelete)
        $('#i' + index).parents(".left_box").remove();
        divAttractionNameDelete.splice(index, 1);
        divAttractionNameArray.splice(index, 1);
        divCount -= 1;
        console.log(divCount)
        isAdd = true;
    }
    //0331
    //動態生成div之後，執行這段的jQuery程式碼
    $(function () {
        //點擊叉叉按鈕時，刪除該區塊
        $("#i" + divCount + "").click(function () {
            //當點擊叉叉按鈕時，找出<div class="left_box"><div>裡面id的屬性值
            //var index_id = $(this).parents(".left_box").attr('id');

            //當點擊叉叉按鈕時，找出該title的文字內容
            var name = $(this).siblings().html();
            console.log(name);


            //在陣列中找尋該文字的索引值為多少
            var nums = divAttractionNameArray.indexOf(name);
            console.log(nums);
            console.log('index')

            //找到該文字索引值之後，用splice()從陣列中刪除該文字
            divAttractionNameArray.splice(nums, 1);
            attractionNameArray.splice(nums, 1);
            attractionShowArray.splice(nums, 1);
            attractionIndexList.splice(nums, 1);

            //移除被選中的整個小區塊
            $(this).parents(".left_box").remove();
            console.log($(this).parents(".left_box"))

            //移除一個區塊，因此i也必須減1
            divCount = divCount - 1;
            //console.log(i)
            console.log(divAttractionNameArray);
        });
        //isAdd = true;
    })
    //console.log(i);
    //console.log(data);
    //}

    // if (divAttractionNameArray[i - 1] == divAttractionNameArray[i]) {
    //     divAttractionNameArray.splice(i, 1);
    //     //console.log(divAttractionNameArray)

    //     //0331
    //     //動態生成div之後，執行這段的jQuery程式碼
    //     $(function () {
    //         //點擊叉叉按鈕時，刪除該區塊
    //         $("#i" + i + "").click(function () {
    //             //當點擊叉叉按鈕時，找出<div class="left_box"><div>裡面id的屬性值
    //             var index_id = $(this).parents(".left_box").attr('id');

    //             //當點擊叉叉按鈕時，找出該title的文字內容
    //             var name = $(this).siblings().html();
    //             //console.log(name);

    //             //在陣列中找尋該文字的索引值為多少
    //             var nums = divAttractionNameArray.indexOf(name);
    //             //console.log(nums);

    //             //找到該文字索引值之後，用splice()從陣列中刪除該文字
    //             divAttractionNameArray.splice(nums, 1);

    //             //移除被選中的整個小區塊
    //             $(this).parents(".left_box").remove();

    //             //移除一個區塊，因此i也必須減1
    //             i = i - 1;
    //             //console.log(i)
    //             console.log(divAttractionNameArray);
    //         });
    //     })
    //     isAdd = false;
    // }



}

// 0401_刪除全部
var btn = document.querySelector('.deleteBox');
btn.addEventListener('click', deleteAll);
function deleteAll() {
    divCount = -1;
    divAttractionNameArray.splice(0, divAttractionNameArray.length);
    attractionNameArray.splice(0, attractionNameArray.length);
    attractionShowArray.splice(0, attractionShowArray.length);
    attractionIndexList.splice(0, attractionIndexList.length);

    $(".left_box").remove();
}
function areaBox() {
    var ul = $('<ul></ul>');
    var cityBB = $('<div></div>');
    var cityBBB = $('<div></div>');
    //var cityAA = $('<div></div>');

    cityBB.addClass('cityBB');
    //cityAA.addClass('cityAA');


    //callDynamic(dynamicArea);
    //console.log(dynamicArea.length);
    for (var i = 0; i < dynamicArea.length; i++) {
        var a = $('<a></a>');
        a.attr('href', '#');
        a.html(dynamicArea[i]);
        var li = $('<li></li>');
        a.appendTo(li);
        li.appendTo(ul);

        $(function () {
            $('.cityBB li').click(function () {
                var index = $(this).index();
                console.log(index);
                var center = dynamicAreaPosition[index].split(', ')
                console.log(center)
                map.setCenter({ lat: Number(center[0]), lng: Number(center[1]) });
                map.setZoom(13);
                infowindowAreas.setPosition(null);
                setMarkers(map, infowindowAreas, areaName);


            })
            $('.cityBB li').mouseover(function () {
                var index = $(this).index();
                // 獲取滑鼠的經緯度座標
                //console.log(name[index]);
                // var areaName = name[index].toString();
                var areaName = dynamicArea[index];
                var center = dynamicAreaPosition[index].split(', ')
                //var areaCenter = [Number(tainanAreas[areaName].split(', ')[0]), Number(tainanAreas[areaName].split(', ')[1])]
                console.log(center)
                var coordinate = { lat: Number(center[0]), lng: Number(center[1]) };
                // 將資訊視窗的位置，設定為滑鼠的座標
                infowindowAreas.setPosition(coordinate);
                // 設定資訊視窗的內容為行政區名稱
                infowindowAreas.setContent('<h2>' + areaName + '</h2>');
                // 將資訊視窗打開在地圖上
                //console.log(map.getZoom());
                infowindowAreas.open(map)
                //console.log(index);
                // this.setOptions({
                //     fillColor: '#FFF'
                // })
            });
            $('.cityBB li').mouseout(function () {
                infowindowAreas.setPosition(null);
            })
        })
    }


    ul.appendTo(cityBB);
    cityBB.appendTo(cityBBB);

    cityBBB.appendTo('.main_box_bgc');
    //console.log('123');
    //cityAA.appendTo('.main_box_bgc');
}
let count = 0;
document.querySelector('.cityAA').addEventListener('click', function () {

    if (count == 0) {
        areaBox();
        count++;
    }
    else{
        $('.cityBB').remove();
        count--;
        map.setCenter({ lat: 23.126094, lng: 120.2971195 });
        map.setZoom(11);
    }


});

function callDistance(distanceDataLandscape) {
    function tData(distanceDataLandscape, callback) {
        setTimeout(callback, 1000, distanceDataLandscape)
    }
    function callbackData(distanceDataLandscape) {
        showDistanceDataLandscape = distanceDataLandscape;

    }
    tData(distanceDataLandscape, callbackData)
}

function setTime(infowindowAreas) {
    function tData(infowindowAreas, callback) {
        setTimeout(callback, 500, infowindowAreas)
    }
    function callbackData(infowindowAreas) {
        infowindowAreas.setPosition(null)

    }
    tData(infowindowAreas, callbackData)
}
