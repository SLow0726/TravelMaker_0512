// $(function() {
//     $(".productImg div").click(function() {
//         $(this).eq(0).hide();
//         $(this).eq(0).siblings().show();
//     })
// })
// $(function() {
//     $(".item .two").hide();
//     $(".item div").click(function() {
//         $(this).eq(index).hide();
//         $(this).eq(1).siblings(".two").show();
//     })
// })

$(function() {
    let imgIndex = ["a", "b", "c"];
    $(".board .productView .two").click(function() {
        let index = $(this).parents(".productView").index();
        console.log(index);
        $(this).parents(".productView").remove();
        // var indexId = $(this).parents(".productView").attr("id");

        var indexNum = imgIndex.indexOf(indexId);
        imgIndex.splice(indexNum, 1); //splice(第index位開始, 取幾個)
    })
})