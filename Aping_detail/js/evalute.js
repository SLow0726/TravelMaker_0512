
var customize = [];
var mylove = [];
var user_Info;
var userID;



function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

var id = getQueryVariable("id")

fetch("http://20.210.96.122/api/Attraction/GetAttractionDetail/" + id)
    .then(res => res.json())
    .then(data => {

        $(".love > h3").html(data.attrName)
        $(".description").html(data.attractionInfo)
        $(".map_border p:nth-child(1)").html("景點名稱: " + data.attrName)
        $(".map_border p:nth-child(2)").html("地址: " + data.attractionAddress)
        $(".attr_Info li:nth-child(1)").html("景點名稱: " + data.attrName)
        $(".attr_Info li:nth-child(2)").html("地址: " + data.attractionAddress)
        $(".item_1 img").attr("src", "http://20.210.96.122/api/Image/GetImage?imgName=" + data.attractionCover)
        $(".location").attr("src", "https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=" + data.attrName + "&z=16&output=embed&t=")
        if (data.attractionPrice != 0) {
            $(".card-title").html("TWD " + data.attractionPrice)
        } else {
            $(".card-title").remove()
            $(".evaluate2").css("height", "120px")
        }


    })


if ($.cookie('user_Info') != undefined) {
    user_Info = $.parseJSON($.cookie('user_Info'))
    userID = getCookieToJson("user_Info", "user_Id")
}

// 加入最愛
if(user_Info != undefined){
    if(user_Info.userFavorite != null && user_Info.userFavorite != ""  && user_Info.userFavorite != "[]"){
        mylove = user_Info.userFavorite.split(",")
    }
}


//加入最愛
for (let i = 0; i < mylove.length; i++) {
    if (id == mylove[i]) {

        document.querySelector('.keep').classList.toggle('is-active')

    }

}

//加入最愛
function toggle() {
    document.querySelector('.keep').classList.toggle('is-active')




    var result = false;
    if (mylove.length != 0) {

        for (let i = 0; i < mylove.length; i++) {
            if (id == mylove[i]) {
                result = true;
            }

        }
    }

    if (result) {
        const index = mylove.indexOf(id)
        if (index > -1) {
            mylove.splice(index, 1)
            user_Info.userFavorite = mylove.join();
            $.cookie('user_Info', JSON.stringify(user_Info))
            postMyLove(mylove)
        }
    } else {
        mylove.push(id)
        user_Info.userFavorite = mylove.join();
        $.cookie('user_Info', JSON.stringify(user_Info))
        postMyLove(mylove)

    }
}
//加入最愛存進資料庫
function postMyLove(data) {
    const formData = new FormData();
    formData.append('userFavorite', data)
    formData.append('user_Id', userID)
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });

    fetch("http://20.210.96.122/api/account/PostAccountDetail", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(object),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).catch(error => console.log(error))
        .then(response => {
            return response.json()
        }).then(data => { })
}

//加入行程存進資料庫
function postTravel(data) {

    const formData = new FormData();
    formData.append('userTravel', data)
    formData.append('user_Id', userID)
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    console.log(object)
    fetch("http://20.210.96.122/api/account/PostAccountDetail", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(object),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).catch(error => console.log(error))
        .then(response => {
            return response.json()
        }).then(data => { })
}

//加入行程
if(user_Info != undefined){
    if (user_Info.userTravel != null && user_Info.userTravel != "") {
        customize = user_Info.userTravel.split(",")
    }
}



//加入行程
for (let i = 0; i < customize.length; i++) {
    if (id == customize[i]) {

        $(".btn").val("已加入行程")
        $(".btn").css("background-color", " Crimson")

    }

}

//加入自訂行程
$(".btn").click(() => {
    $(".btn").css("background-color", " Crimson")

    if ($(".btn").val() == "加入自訂行程") {
        customize.push(id);
        user_Info.userTravel = customize.join();
        $.cookie('user_Info', JSON.stringify(user_Info));
        $(".btn").css("background-color", " Crimson");
        $(".btn").val("已加入行程");
        postTravel(customize)
    } else {
        const index = customize.indexOf(id);
        customize.splice(index, 1);
        user_Info.userTravel = customize.join();
        $.cookie('user_Info', JSON.stringify(user_Info));
        $(".btn").css("background-color", " #408080");
        $(".btn").val("加入自訂行程");
        postTravel(customize);
    }

})



$('.evaluateSub').on('click', () => {
    var text = $(".evaluateText").val()


    Swal.fire({
        title: '傳送成功',
        icon: 'success',
        confirmButtonText: '確認'
    })
    $("<div/>", {


        "class": "col-12 col-md-4 ",
        "id": "user01"



    }).appendTo(".userEvaluate");


    $("<div/>", {
        "class": "card mb-4"
    }).appendTo("#user01");

    $("<div/>", {
        "class": "card-header bg-transparent headerTitle"
    }).appendTo("#user01 >.card");

    $("<img/>", {
        "class": "userImg",
        "src": "./Aping_detail/image/3.jpg"
    }).appendTo("#user01 >.card >.card-header");

    $("<div/>", {

        "text": "2022/4/09"
    }).appendTo("#user01 >.card >.card-header");


    $("<div/>", {
        "class": "card-body text-success",
    }).appendTo("#user01 > .card");
    $("<p/>", {
        "class": "card-text",
        "text": `${text}`
    }).appendTo("#user01> .card>.card-body");

    $("<div/>", {
        "class": "card-footer bg-transparent",
        "text": `★${4.0}`
    }).appendTo("#user01> .card");
});


setTimeout(() => {
    fetch('http://20.210.96.122/api/Attraction/GetAttractionCount')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson[id]);
            $('#count').html("瀏覽次數:" + myJson[id])
        });
}, 1000);
