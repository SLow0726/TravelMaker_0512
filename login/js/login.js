

document.addEventListener("DOMContentLoaded", function () {
    //切換註冊及登入頁面
    let pageChanged = false;
    let searChanged = true;

    const registerPage = document.querySelector("#registerPage");
    const loginPage = document.querySelector(".loginPage");
    const register = document.querySelector(".register");
    const login = document.querySelector(".login");
    const search = document.querySelector(".search")
    const searchPage = document.querySelector(".forgetPassword")
    const toggleLogin = document.querySelector(".toggleLogin");




    //確保進入為登入介面及整個欄位清空
    $('#account_login').click(() => {
        pageChanged = false;
        register.classList.add("hidden");
        login.classList.remove("hidden");
        search.classList.add("hidden");
        $('.userErro').empty();
        $('.passErro').empty();
        $('.mailErro').empty();
        $('.phoneErro').empty();
        $(".inputContent").val("");
        $('.pswErro').empty();
        $('.nameErro').empty();
    });


    //切換註冊及登入頁面及欄位清空
    const changePageFunc = () => {
        if (pageChanged) {
            pageChanged = false;
            register.classList.add("hidden");
            login.classList.remove("hidden");
            search.classList.add("hidden");
        }
        else {
            pageChanged = true;
            register.classList.remove("hidden");
            login.classList.add("hidden");
            search.classList.add("hidden");
            $('.userErro').empty();
            $('.passErro').empty();
            $('.mailErro').empty();
            $('.phoneErro').empty();
            $('.pswErro').empty();
            $('.nameErro').empty();


        }
    }

    const searchPageFunc = () => {

        pageChanged = true;
        search.classList.remove("hidden");
        login.classList.add("hidden");
        register.classList.add("hidden");
    }

    registerPage.addEventListener("click", changePageFunc)
    loginPage.addEventListener("click", changePageFunc)
    searchPage.addEventListener("click", searchPageFunc)
    toggleLogin.addEventListener("click", changePageFunc)



    //先判斷帳號、信箱重複 及不能空值
    fetch(' http://20.210.96.122/api/account/GetRegister')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {


            $('#name').blur(() => {
                var name = false;
                var nameNull = false;
                $.each(myJson, function (key, member) {

                    if ($("#name").val() == member.userAccount) {
                        name = true;
                        return false;
                    } else if ($("#name").val().length == 0) {
                        nameNull = true;
                        return false;
                    }

                });

                if (name) {
                    $('.userErro').html("*此帳號已註冊*");
                } else {
                    $('.userErro').empty();
                }

                if (nameNull) {
                    $('.userErro').html("*帳號不能空白*");
                }
            });


            $('#mail').blur(() => {
                var email = false;
                var emailNull = false;
                var emailFormat = false;
                $.each(myJson, function (key, member) {
                    if ($("#mail").val().length == 0) {
                        emailNull = true;
                        return false;
                    } else if ($("#mail").val() == member.userEmail) {
                        email = true;
                        return false;
                    } else if ($("#mail").val().search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/) == -1) {
                        emailFormat = true;
                        return false;
                    }
                });

                if (email) {
                    $('.mailErro').html("*此信箱已註冊*");
                } else {
                    $('.mailErro').empty();
                }

                if (emailNull) {
                    $('.mailErro').html("*信箱不能空白*");
                }

                if (emailFormat) {
                    $('.mailErro').html("*信箱格式錯誤*");
                }

            });




        });

    //先判斷密碼是否為空值

    $('#pass').blur(() => {
        if ($("#pass").val().length == 0) {
            $('.passErro').html("*密碼不能空白*");
        } else {
            $('.passErro').empty();
        }
    })

    //先判斷手機是否為空值、格式是否正確
    $('#phone').blur(() => {
        if ($("#phone").val().length == 0) {
            $('.phoneErro').html("*手機不能空白*");
        } else if ($("#phone").val().search(/^09\d{8}$/) == -1) {

            $('.phoneErro').html("*手機格式錯誤*");
        } else {
            $('.phoneErro').empty();
        }
    })


    //點擊註冊按鈕判斷

    $('#btnRegister').click(() => {
        $('#btnRegister').addClass("hidden")
        $('.fa-spinner').removeClass("hidden")

        let preventForm = false //判斷欄位輸入是否都正確

        //判斷帳號
        fetch('http://20.210.96.122/api/account/GetRegister')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var name = false;
                var nameNull = false;
                $.each(myJson, function (key, member) {

                    if ($("#name").val() == member.userAccount) {
                        name = true;
                        return false;

                    } else if ($("#name").val().length == 0) {
                        nameNull = true;
                        return false;
                    }

                });

                if (name) {
                    $('.userErro').html("*此帳號已註冊*");
                    preventForm = true;
                } else {
                    $('.userErro').empty();
                }

                if (nameNull) {

                    $('.userErro').html("*帳號不能空白*");
                    preventForm = true;
                }

                //判斷信箱
                var email = false;
                var emailNull = false;
                var emailFormat = false;
                $.each(myJson, function (key, member) {
                    if ($("#mail").val().length == 0) {
                        emailNull = true;
                        return false;
                    } else if ($("#mail").val() == member.userEmail) {
                        email = true;
                        return false;
                    } else if ($("#mail").val().search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/) == -1) {
                        emailFormat = true;
                        return false;
                    }
                });

                if (email) {
                    $('.mailErro').html("*此信箱已註冊*");
                    preventForm = true;
                } else {
                    $('.mailErro').empty();
                }

                if (emailNull) {
                    $('.mailErro').html("*信箱不能空白*");
                    preventForm = true;
                }

                if (emailFormat) {
                    $('.mailErro').html("*信箱格式錯誤*");
                    preventForm = true;
                }


            })

        //判斷密碼
        if ($("#pass").val().length == 0) {
            $('.passErro').html("*密碼不能空白*");
            preventForm = true;
        } else {
            $('.passErro').empty();
        };

        //判斷手機
        if ($("#phone").val().length == 0) {
            $('.phoneErro').html("*手機不能空白*");
            preventForm = true;
        } else if ($("#phone").val().search(/^09\d{8}$/) == -1) {
            $('.phoneErro').html("*手機格式錯誤*");
            preventForm = true;
        } else {
            $('.phoneErro').empty();
        };



        //註冊欄位都輸入正確則傳入後端
        setTimeout(() => {
            if (preventForm == false) {
                const formdata = new FormData(document.querySelector('#formRegister'))
                const object = {};
                formdata.forEach((value, key) => {
                    object[key] = value;
                });
                console.log(JSON.stringify(object));
                console.log(object)
                fetch("http://20.210.96.122/api/account/PostRegister", {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(object),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                }).catch(error => console.log(error))
                    .then(response => {
                        if (response.status == 201) {
                            Swal.fire({
                                title: '註冊成功，請到信箱進行驗證',
                                icon: 'success',
                                confirmButtonText: '確認'
                            })
                            $('#btnRegister').removeClass("hidden")
                            $('.fa-spinner').addClass("hidden")
                        }
                    });
            } else {
                $('#btnRegister').removeClass("hidden")
                $('.fa-spinner').addClass("hidden")

            };
        }, 100);

    });


    //登入傳入後端
    $('#btnLogin').click(() => {

        $('#btnLogin').addClass("hidden");
        $('.fa-spinner').removeClass("hidden");
        let preventForm = false;
        if ($("#user").val().length == 0) {
            $('.nameErro').html("*帳號不能空白*");
            preventForm = true;
        } else {
            $('.nameErro').empty();
        };

        if ($("#psw").val().length == 0) {
            $('.pswErro').html("*密碼不能空白*");
            preventForm = true;
        } else {
            $('.pswErro').empty();
        };

        setTimeout(() => {
            if (preventForm == false) {
                $('.loginErro').empty();
                const formdata = new FormData(document.querySelector('#formLogin'))
                const object = {};
                formdata.forEach((value, key) => {
                    object[key] = value;
                });
                fetch("http://20.210.96.122/api/account/Login", {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(object),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                }).catch(error => console.log(error))
                    .then(response => {
                        if (response.status == 404) {
                            $('.loginErro').html("*帳號密碼錯誤*");
                            $('#btnLogin').removeClass("hidden");
                            $('.fa-spinner').addClass("hidden");
                        }

                        if (response.status == 201) {
                            return response.json();
                        }
                    }).then(data => {
                        var email=data.userEmail;
                        
                        if (data.email_Approved == "N") {
                            // $('.loginErro').html("*信箱未驗證*");
                            fetch("http://20.210.96.122/api/account/RetryActiveEmail?email=" + email
                            ).catch(error => console.log(error))
                                .then(response => {
                                    $('.loginErro').html("*此帳號未驗證，已重新發送驗證郵件*");
                                    $('#btnLogin').removeClass("hidden");
                                    $('.fa-spinner').addClass("hidden");
                                })


                        } else {

                            var data = JSON.stringify(data)
                           
                            setCookie("user_Info", JSON.stringify(data), 7)
                            $('#btnLogin').removeClass("hidden");
                            $('.fa-spinner').addClass("hidden");
                            document.location.href = "home.html"

                        }
                    })
            } else {
                $('#btnLogin').removeClass("hidden");
                $('.fa-spinner').addClass("hidden");

            };
        }, 100);

    })


    //找回密碼
    $('#btnSerch').click(() => {

        $('#btnSerch').addClass("hidden");
        $('.fa-spinner').removeClass("hidden");
        let preventForm = false;
        if ($("#inputEmail").val().length == 0) {
            $('.searchErro').html("*信箱不能空白*");
          
            preventForm = true;
        } else if ($("#inputEmail").val().search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/) == -1) {
            $('.searchErro').html("*信箱格式錯誤*");
           
            preventForm = true;
        }
        else {
            $('.searchErro').empty();
        };


        if (preventForm == false) {
            var email =$('.searchEmail input').val();
            // const formdata = new FormData(document.querySelector('#formLogin'));
            // const object = {};
            // formdata.forEach((value, key) => {
            //     object[key] = value;
            // });
           
            fetch("http://20.210.96.122/api/account/ReplyPassword?email=" + email
            ).catch(error => console.log(error))
                .then(response => {
                    if (response.status == 201) {
                        Swal.fire({
                            title: '已發送新密碼,請到信箱查看',
                            confirmButtonText: '確認'
                        })
                        $('#btnSerch').removeClass("hidden")
                        $('.fa-spinner').addClass("hidden")
                    }if (response.status == 404) {
                        $('.searchErro').html("*信箱錯誤*");
                        $('#btnSerch').removeClass("hidden")
                        $('.fa-spinner').addClass("hidden")
                    }
                })
        }else{
            $('#btnSerch').removeClass("hidden")
            $('.fa-spinner').addClass("hidden")
        }

    });
    $('.title').click(() => {
        $("#name").val("Ac001")
        $("#mail").val("qb7451320agmial.com")
        $("#phone").val("091234567")
        $("#pass").val("1111")
    })

    $('.memberLogin').click(() => {
        $("#user").val("test001")
        $("#psw").val("1111")
    })
   

});




