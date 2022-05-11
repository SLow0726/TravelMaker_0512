function sliderInit() {
    $('.mycarousel').slick({

        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]
    });
}


//熱門活動
fetch('http://20.210.96.122/api/Attraction/homeAttraction')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
    
        
        for (let i = 0; i <myJson.hotActive.length; i++) {
        
            
            $("<div/>", {


                "class": "card ",
                "id": `${myJson.hotActive[i].attr_Id}`,
    
    
            }).appendTo("#hotActive");
    
            $("<a/>", {
                "href": "attraction_detail.html?id=" +myJson.hotActive[i].attr_Id
            }).appendTo(`#hotActive #${myJson.hotActive[i].attr_Id}`);
    
            $("<div/>", {
                "class": "overlap",
            }).appendTo(`#hotActive #${myJson.hotActive[i].attr_Id}>a`);
    
            $("<div/>", {
    
                "class": "cardImg",
    
            }).appendTo(`#hotActive #${myJson.hotActive[i].attr_Id}`);
    
            $("<img/>", {
                "src": "http://20.210.96.122/api/Image/GetImage?imgName="+myJson.hotActive[i].attractionCover
            }).appendTo(`#hotActive #${myJson.hotActive[i].attr_Id} .cardImg`);
            $("<div/>", {
    
    
                "class": "card-body",
    
            }).appendTo(`#hotActive #${myJson.hotActive[i].attr_Id} `);
    
            $("<h5/>", {
    
    
                "class": "card-text",
                "text": `${myJson.hotActive[i].attrName}`
    
            }).appendTo(`#hotActive #${myJson.hotActive[i].attr_Id}>.card-body`);
    
            $("<h5/>", {
    
               
               "class": "price",
                "text":  `TWD ${myJson.hotActive[i].attractionPrice}`
    
            }).appendTo(`#hotActive #${myJson.hotActive[i].attr_Id} >.card-body`);
    
               
            if(myJson.hotActive[i].attractionPrice==0){
                $(`#${myJson.hotActive[i].attr_Id} .price`).remove()
            
            }
            
        }


        for (let i = 0; i <myJson.recommend.length; i++) {
        
            
            $("<div/>", {


                "class": "card ",
                "id": `${myJson.recommend[i].attr_Id}`,
    
    
            }).appendTo("#recommend");
    
            $("<a/>", {
                "href": "attraction_detail.html?id=" +myJson.recommend[i].attr_Id
            }).appendTo(`#recommend #${myJson.recommend[i].attr_Id}`);
    
            $("<div/>", {
                "class": "overlap",
            }).appendTo(`#recommend #${myJson.recommend[i].attr_Id}>a`);
    
            $("<div/>", {
    
                "class": "cardImg",
    
            }).appendTo(`#recommend #${myJson.recommend[i].attr_Id}`);
    
            $("<img/>", {
                "src": "http://20.210.96.122/api/Image/GetImage?imgName="+myJson.recommend[i].attractionCover
            }).appendTo(`#recommend #${myJson.recommend[i].attr_Id} .cardImg`);
            $("<div/>", {
    
    
                "class": "card-body",
    
            }).appendTo(`#recommend #${myJson.recommend[i].attr_Id} `);
    
            $("<h5/>", {
    
    
                "class": "card-text",
                "text": `${myJson.recommend[i].attrName}`
    
            }).appendTo(`#recommend #${myJson.recommend[i].attr_Id}>.card-body`);
    
            $("<h5/>", {
    
    
                "class":"price",
                "text":  `TWD ${myJson.recommend[i].attractionPrice}`
    
            }).appendTo(`#recommend #${myJson.recommend[i].attr_Id} >.card-body`);

            if(myJson.recommend[i].attractionPrice==0){
                $(`#${myJson.recommend[i].attr_Id} .price`).remove()
            }
        }

        for (let i = 0; i <myJson.rain.length; i++) {
        
            
            $("<div/>", {


                "class": "card ",
                "id": `${myJson.rain[i].attr_Id}`,
    
    
            }).appendTo("#rain");
    
            $("<a/>", {
                "href":  "attraction_detail.html?id=" +myJson.rain[i].attr_Id
            }).appendTo(`#rain #${myJson.rain[i].attr_Id}`);
    
            $("<div/>", {
                "class": "overlap",
            }).appendTo(`#rain #${myJson.rain[i].attr_Id}>a`);
    
            $("<div/>", {
    
                "class": "cardImg",
    
            }).appendTo(`#rain #${myJson.rain[i].attr_Id}`);
    
            $("<img/>", {
                "src": "http://20.210.96.122/api/Image/GetImage?imgName="+myJson.rain[i].attractionCover
            }).appendTo(`#rain #${myJson.rain[i].attr_Id} .cardImg`);
            $("<div/>", {
    
    
                "class": "card-body",
    
            }).appendTo(`#rain #${myJson.rain[i].attr_Id} `);
    
            $("<h5/>", {
    
    
                "class": "card-text",
                "text": `${myJson.rain[i].attrName}`
    
            }).appendTo(`#rain #${myJson.rain[i].attr_Id}>.card-body`);
    
            $("<h5/>", {
    
    
                "class":"price",
                "text":  `TWD ${myJson.rain[i].attractionPrice}`
    
            }).appendTo(`#rain #${myJson.rain[i].attr_Id} >.card-body`);

            if(myJson.rain[i].attractionPrice==0){
                $(`#${myJson.rain[i].attr_Id} .price`).remove()
            }
        }

        for (let i = 0; i <myJson.mystery.length; i++) {
        
            
            $("<div/>", {


                "class": "card ",
                "id": `${myJson.mystery[i].attr_Id}`,
    
    
            }).appendTo("#mystery");
    
            $("<a/>", {
                "href":  "attraction_detail.html?id=" +myJson.mystery[i].attr_Id
            }).appendTo(`#mystery #${myJson.mystery[i].attr_Id}`);
    
            $("<div/>", {
                "class": "overlap",
            }).appendTo(`#mystery #${myJson.mystery[i].attr_Id}>a`);
    
            $("<div/>", {
    
                "class": "cardImg",
    
            }).appendTo(`#mystery #${myJson.mystery[i].attr_Id}`);
    
            $("<img/>", {
                "src": "http://20.210.96.122/api/Image/GetImage?imgName="+myJson.mystery[i].attractionCover
            }).appendTo(`#mystery #${myJson.mystery[i].attr_Id} .cardImg`);
            $("<div/>", {
    
    
                "class": "card-body",
    
            }).appendTo(`#mystery #${myJson.mystery[i].attr_Id} `);
    
            $("<h5/>", {
    
    
                "class": "card-text",
                "text": `${myJson.mystery[i].attrName}`
    
            }).appendTo(`#mystery #${myJson.mystery[i].attr_Id}>.card-body`);
    
            $("<h5/>", {
    
                "class":"price",
    
                "text": `TWD ${myJson.mystery[i].attractionPrice}`
    
            }).appendTo(`#mystery #${myJson.mystery[i].attr_Id} >.card-body`);

            if(myJson.mystery[i].attractionPrice==0){
                $(`#${myJson.mystery[i].attr_Id} .price`).remove()
            }

        }
        sliderInit()

    });
