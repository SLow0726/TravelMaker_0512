

//設置Cookie
function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}


function setCookieJson(name, value) {
    var cookieExisted = getCookie(name).replace(/"/g,"");
    var cookie;
    if (cookieExisted.length) {
        if (!cookieExisted.includes(value)) {
            cookie = [name, '=', JSON.stringify(value + ',' + cookieExisted), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
        }
    } else {
        cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    }
    document.cookie = cookie;
}

//取得cookie(一般)
function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split(';');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
}


//取得cookie(Json)
function getCookieToJson(key, value) {
    if (value != null) {
        const a = value
        const cDecoded = JSON.parse($.cookie(key)); //to be careful
        let res = cDecoded[a]
        // const cArr = cDecoded .split('; ');

        // let res;
        // cArr.forEach(val => {
        //     if (val.indexOf(name) === 0) res = val.substring(name.length);
        // })
        return res;
    }

}


//刪除cookie
function delCookie(CName) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cDecoded = JSON.parse($.cookie(CName));
    if (cDecoded != null) document.cookie = CName + "=" + cDecoded + ";expires=" + exp.toGMTString();
}



//登入後更換使用者
if (getCookieToJson("user_Info", "user_Id") != null) {

    var a = String(getCookieToJson("user_Info", "user_Id")).length
    if (a.length != 0) {
        $('#account_login').addClass("hidden");
        $('.drop-down-menu').removeClass("hidden");
    }
}


//登出
$('.logout').click(() => {

    delCookie("user_Info");
})




//判斷使用者是否有圖片,沒有用預設圖片
function updateImage() {
    const imagePreview = document.querySelector('[data-target="image-preview"]');
    const getImg = localStorage.getItem("user_img");
    if (getImg) {
        $('.userImg').css('background-image', 'url(' + getImg + ')');
        if (imagePreview) {
            imagePreview.src = getImg;
        }


    } else {
        $('.userImg').css('background-image', 'url(/home/image/preset.jpg)');
         imagePreview.src = "/home/image/preset.jpg";
        // imagePreview.attr("src" , "home/image/preset.jpg")
    }

}


setTimeout(updateImage, 1)

