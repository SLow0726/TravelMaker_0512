fetch('http://20.210.96.122/api/Travel/MapCenter')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        for (let i = 0; i < myJson.length; i++) {
            tainanAreas[myJson[i].mcName] = myJson[i].mcPosition
            dynamicArea.push(myJson[i].mcName);
            dynamicAreaPosition.push(myJson[i].mcPosition);
        }
        //console.log(tainanAreas)

    });
fetch('http://20.210.96.122/api/Attraction/GetAttractionDetail')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        for (let i = 0; i < myJson.length; i++) {
            areaAttractions.push([myJson[i].attractionDistrict, myJson[i].attrName, myJson[i].position, myJson[i].attractionInfo])
            coverDataList.push(myJson[i].attractionCover);
        }
        console.log(areaAttractions)
    });




