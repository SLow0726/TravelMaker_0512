const contentString = '';

const infowindowAreas = new google.maps.InfoWindow({
    content: contentString,
});


$.getJSON('http://20.210.96.122/api/Image/GetImage?imgName=6B5039D77C8F34B7D7E0CEB7FF248D62.json', function(e) {
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    var features = e.features;
    //console.log(features);
    // 載入資料後要做的事情.....
    var taiwan = []; // 行政區域多邊形特徵值的陣列
    var name = []; // 行政區域名稱的陣列
    

    features.forEach(function(i, index) {
        name.push(i.properties.TOWN); // 將各個行政區的名字記錄到 name 陣列中
        if (i.geometry.coordinates.length == 1) {
            // 如果行政區域只有一塊，例如南投縣
            var arr = [];
            i.geometry.coordinates[0].forEach(function(j) {
                arr.push({
                    lat: j[1],
                    lng: j[0]
                });
            });
            taiwan.push(arr);
        } else {
            // 如果行政區域不只一塊，例如台東縣包含綠島和蘭嶼，就是個多邊形集合
            var arr = [];
            for (var k = 0; k < i.geometry.coordinates.length; k++) {
                var arrContent = [];
                switch (i.geometry.coordinates[k].length) {
                    case 1:
                        //如果行政區域沒有包含其他的行政區域，例如台東縣
                        i.geometry.coordinates[k][0].forEach(function(j) {
                            arrContent.push({
                                lat: j[1],
                                lng: j[0]
                            });
                        });
                        break;
                    case 2:
                        //如果行政區域包含了其他的行政區域，例如嘉義縣包覆著嘉義市
                        i.geometry.coordinates[k][0].forEach(function(j) {
                            arrContent.push({
                                lat: j[1],
                                lng: j[0]
                            });
                        });
                        break;
                    case 5:
                        //如果行政區域包含了其他的行政區域，例如嘉義縣包覆著嘉義市
                        for (let l = 0; l < i.geometry.coordinates[k][l].length; l++) {
                            i.geometry.coordinates[k][l].forEach(function(j) {
                                arrContent.push({
                                    lat: j[1],
                                    lng: j[0]
                                });
                            });
                        }

                        break;
                    default:
                        //如果行政區域包含了其他的行政區域，例如嘉義縣包覆著嘉義市
                        i.geometry.coordinates[k].forEach(function(j) {
                            arrContent.push({
                                lat: j[1],
                                lng: j[0]
                            });
                        });
                        break;
                }


                arr.push(arrContent);
            }
            taiwan.push(arr);
        }

        // 依序在地圖上畫出對應的多邊形
        polygonPath[index] = new google.maps.Polygon({
            paths: arr,
            strokeColor: '#3C3C3C',
            strokeOpacity: .7,
            strokeWeight: 1,
            strokePosition: google.maps.StrokePosition.CENTER,
            fillColor: '#019858',
            fillOpacity: 0.35,
            map: map
        });

        //畫完行政區域後要做的事情.....

        // 為每個多邊形加上滑鼠點擊事件
        polygonPath[index].addListener('click', function(e) {
            //var coordinate = { lat: e.latLng.lat(), lng: e.latLng.lng() };


            // var areaName = name[index].toString();
            // polygonPath[oldClickIndex] = new google.maps.Polygon({

            //   fillColor: '#019858',

            // });


            //='#019858'


            var areaName = name[index];
            //console.log(areaName);
            //console.log(tainanAreas[areaName]);
            var areaCenter = [Number(tainanAreas[areaName].split(', ')[0]), Number(tainanAreas[areaName].split(', ')[1])]
                //map.setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            map.setCenter({ lat: areaCenter[0], lng: areaCenter[1] });
            map.setZoom(13);
            infowindow.setPosition(null);
            setMarkers(map, infowindowAreas, areaName);
            //  const attraction = areaAttractions[0].split(', ');
            //console.log(map.getZoom())
            // if (attractionNameArray.indexOf(areaAttractions[i][1]) > -1) {

            // }
            oldClickIndex = clickIndex;
            clickIndex = index;

            // marker.setOptions({
            //   //label: attractionNameArray.length.toString(),
            //   animation: google.maps.Animation.BOUNCE,
            // }) 
            if (oldClickIndex != clickIndex) {
                if (oldClickIndex != null) {
                    console.log(polygonPath[index].fillColor)
                        //console.log(polygonPath[oldClickIndex])

                    polygonPath[oldClickIndex].setOptions({

                        fillColor: '#019858'
                    })
                }
            }


        });




        // 設定滑鼠移到多邊形上，多邊形會變成半透明綠色
        polygonPath[index].addListener('mouseover', function(e) {
            // 獲取滑鼠的經緯度座標
            //console.log(name[index]);
            // var areaName = name[index].toString();
            var areaName = name[index];
            var areaCenter = [Number(tainanAreas[areaName].split(', ')[0]), Number(tainanAreas[areaName].split(', ')[1])]

            var coordinate = { lat: areaCenter[0], lng: areaCenter[1] };
            // 將資訊視窗的位置，設定為滑鼠的座標
            infowindow.setPosition(coordinate);
            // 設定資訊視窗的內容為行政區名稱
            infowindow.setContent(
                '<h2>' + name[index] + '</h2>'
            
                );
            // 將資訊視窗打開在地圖上
            //console.log(map.getZoom());
            if (map.getZoom() >= 13) {
                infowindow.setPosition(null);
            }
            if (map.getZoom() <= 12) {
                infowindow.open(map);

            }
            //console.log(index);
            this.setOptions({
                fillColor: '#FFF'
            })
        });



        // 設定滑鼠移出多邊形，多邊形會恢復半透明綠色
        polygonPath[index].addListener('mouseout', function(e) {
            if (clickIndex != index) {
                this.setOptions({
                    fillColor: '#019858'
                })
            }

            infowindow.setPosition(null);
        });


        
    });

});