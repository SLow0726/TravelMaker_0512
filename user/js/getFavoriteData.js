var mylove = [];
var user_Info = $.parseJSON($.cookie('user_Info'))
var userID=getCookieToJson("user_Info","user_Id")
if (user_Info.userFavorite != null && user_Info.userFavorite != "" && user_Info.userFavorite != "[]") {
    mylove = user_Info.userFavorite.split(",")
}

for (let i = 0; i < mylove.length; i++) {
   
    fetch('http://20.210.96.122/api/Attraction/GetAttractionDetail/'+ mylove[i])
    .then(function(response) {
        return response.json();
    })
    .then(attraction => {
        console.log(attraction.attractionCover)
        $("<div/>", {


            "class": "productView mt-4 ",
            "id": `${attraction.attr_Id}`,
        
        
        }).appendTo(".board");

     
        
        $("<div/>", {
            "class": "productImg",
        }).appendTo(`#${attraction.attr_Id}`);
        
        $("<div/>", {
        
            "class": "icon",
        
        }).appendTo(`#${attraction.attr_Id} > .productImg`);
        
        
        $("<i/>", {
            "class": "fa-solid fa-trash-can"
        }).appendTo(`#${attraction.attr_Id} > .productImg > .icon`);
        
        
        
        $("<div/>", {
        
        
            "class": "product-detail ",
        
        }).appendTo(`#${attraction.attr_Id}`);
        
        $("<h3/>", {
        
        
        }).appendTo(`#${attraction.attr_Id} >.product-detail`);
        
        $("<span/>", {
        
        
            "class": "product-listview__name ",
            "text": `${attraction.attrName}`
        
        }).appendTo(`#${attraction.attr_Id} >.product-detail > h3`);
        
        $("<p/>", {
        
        
            "class": "description ",
            "text": `${attraction.attractionInfo}`
        
        }).appendTo(`#${attraction.attr_Id} >.product-detail `);
        
         $("<div/>", {
             "class": "product-listview__inco_info--flex_item product-place",
         }).appendTo(`#${attraction.attr_Id} >.product-detail `);
        
         $("<i/>", {
             "class": "fa-solid fa-location-dot",
             "text": ` 台灣 ${attraction.attractionCity}`
         }).appendTo(`#${attraction.attr_Id} >.product-detail > .product-place`);

       $(`#${attraction.attr_Id} .productImg`).css('background-image','url(http://20.210.96.122/api/Image/GetImage?imgName=' + attraction.attractionCover + ')')
       $(`#${attraction.attr_Id}`).click(()=>{
        location.href="attraction_detail.html?id=" +attraction.attr_Id
       })
          
       delData();
    });
}






function delData() {
   
    $(".board .productView .icon").click(function() {
        let index = $(this).parents(".productView").index();
        $(this).parents(".productView").remove();
         var indexId = $(this).parents(".productView").attr("id");
         console.log(indexId)

        var indexNum = mylove.indexOf(indexId);
        mylove.splice(indexNum, 1); //splice(第index位開始, 取幾個)

        user_Info.userFavorite = mylove.join();
        $.cookie('user_Info', JSON.stringify(user_Info))
        postMyLove(mylove)
    });
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


