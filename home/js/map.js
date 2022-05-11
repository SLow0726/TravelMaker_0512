$(function () {
    //$(".right_box .citys>ul").hide();
    //$(".right_box").hide();

    //網頁刷新後消失
    // $(".cityAA").hide();
    // $(".cityBB").hide();
    // $(".city_box").hide();
    //0404修改
    $(".banner .left").hide();


    // $(".right_box>.city").click(function(){
    //     $(this).siblings(".citys").children("ul").show();
    // });

    //0406早上修改
    // $(".city").click(function(){
    //     // $(".city_box .citys>ul").toggle();
    //     $(".city_box").toggle();
    //     //0404修改
    //     $(".banner .main").show("main_w99");
    //     $(".banner .main").toggleClass("main_w80");
    //     $(".banner .left").toggle('slide');
    // });

    // $(".city_box").click(function () {
    //     $(".city").hide();
    //     $(".city_box").hide();
    //     $(".cityAA").show();
    //     $(".cityBB").show();
    // });

    // $(".cityAA").click(function () {
    //     $(".cityAA").hide();
    //     $(".cityBB").hide();
    //     $(".city").show();
    //     $(".city_box").show();
    // });

    // $(".city").click(function(){
    //     $(".city").hide();
    //     $(".city_box").hide();
    // });


    // $(".city_box .citys>ul").click(function(){
    //     $(".city_box .citys>ul").hide();
    //     $(".main_box_bgc>.city").hide();
    //     $(".cityAA").show();
    //     $(".main_box_bgc .cityBB ").show();
    // })

    // $(".citys2>ul>li").click(function () {
    //     var index = $(this).index();
    //     console.log(index);
    // })

    //點擊右上叉叉，移除某個點的地標訊息
    $(".title_box > i").click(function () {
        let index = $(this).parents(".left_box").index();
        console.log(index);
        $(this).parents(".left_box").remove();
    });

    //0401_拖曳效果
    //console.log(isDrag);
    var tempNameAttr;
    var tempCoordinate;
    var tempIndex;
    $(".left_content").sortable({
        revert: true,
        //0401改
        start: function (e, ui) {
            console.log(ui.item.index());
            let index = ui.item.index();
            tempNameAttr = attractionNameArray[index]
            tempCoordinate = attractionShowArray[index]
            tempIndex = attractionIndexList[index]
            attractionNameArray.splice(index, 1);
            attractionShowArray.splice(index, 1);
            attractionIndexList.splice(index, 1);
        },
        stop: function (e, ui) {
            //記錄sort後的id順序陣列 用toArray可以讓陣列自動更新排序
            console.log(ui.item.index());
            let index = ui.item.index();
            attractionNameArray.splice(index, 0, tempNameAttr);
            attractionShowArray.splice(index, 0, tempCoordinate);
            attractionIndexList.splice(index, 0, tempIndex);

            console.log(attractionNameArray)
            if (attractionNameArray.length >= 2) {
                calculateAndDisplayRoute(directionsService, directionsRenderer);
                directionsRenderer.setMap(map);
            }
            else{
                directionsRenderer.setMap(null);
            }
        },
        //0406修改_拖曳時不會自動觸發點擊事件
        helper: "clone"
    });

    //0401_摺疊內容
    $(".left_content").on('click', '.title_box', function (e) {
        e.preventDefault();
        $(this).next('.content').not(':animated').slideToggle();
    })


})



