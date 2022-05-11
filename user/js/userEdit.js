

$(document).ready(function () {
    getUser();

    var User_Id= getCookieToJson("user_Info", "user_Id")

    function getUser() {
        console.log
        var User_Id= getCookieToJson("user_Info", "user_Id")
        fetch('http://20.210.96.122/api/account/GetAccountDetail/'+User_Id)
            .then(function (response) {
                return response.json();
            }).then(function (myJson) {
                $(".userAccount").val(myJson.userAccount);
                $(".userPhone").val(myJson.userPhone);
                $(".userEmail").val(myJson.userEmail);

            }).catch(error => console.error('Error:', error));

    }







    //先判斷帳號、信箱重複 及不能空值
    fetch('./fetch.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {


            $('.userAccount').blur(() => {
                var name = false;
                var nameNull = false;
                $.each(myJson, function (key, member) {

                    if ($(".userAccount").val() == member.userAccount && member.user_Id != getCookie("user_Id")) {
                        name = true;
                        return false;
                    } else if ($(".userAccount").val().length == 0) {
                        nameNull = true;
                        return false;
                    }

                });

                if (name) {
                    $('.accoutErro').html("*此帳號已註冊*");
                } else {
                    $('.accoutErro').empty();
                }

                if (nameNull) {
                    $('.accoutErro').html("*帳號不能空白*");
                }
            });


            $('.userEmail').blur(() => {
                var email = false;
                var emailNull = false;
                var emailFormat = false;
                $.each(myJson, function (key, member) {
                    if ($(".userEmail").val().length == 0) {
                        emailNull = true;
                        return false;
                    } else if ($(".userEmail").val() == member.userEmail && member.user_Id != getCookie("user_Id")) {
                        email = true;
                        return false;
                    } else if ($(".userEmail").val().search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/) == -1) {
                        emailFormat = true;
                        return false;
                    }
                });

                if (email) {
                    $('.emailErro').html("*此信箱已註冊*");
                } else {
                    $('.emailErro').empty();
                }

                if (emailNull) {
                    $('.emailErro').html("*信箱不能空白*");
                }

                if (emailFormat) {
                    $('.emailErro').html("*信箱格式錯誤*");
                }

            });


        });

    $('.userPhone').blur(() => {
        if ($(".userPhone").val().length == 0) {
            $('.phoneErro').html("*手機不能空白*");
        } else if ($(".userPhone").val().search(/^09\d{8}$/) == -1) {

            $('.phoneErro').html("*手機格式錯誤*");
        } else {
            $('.phoneErro').empty();
        }
    })


    $('.psw').blur(() => {
        if ($(".userPassword").val() != $(".psw").val()) {

            $('.pswdErro').html("*密碼與確認密碼不相同*");
        } else {
            $('.pswdErro').empty();
        }
    })

    // $('.userPassword').blur(() => {
    //     if ($(".userPassword").val() != $(".psw").val()) {

    //         $('.pswdErro').html("*密碼與確認密碼不相同*");
    //     } else {
    //         $('.pswdErro').empty();
    //     }
    // })


    $('.btnSave').click(() => {


        $('.btnSave').addClass("hidden")
        $('.fa-spinner').removeClass("hidden")
        let preventForm = false;//判斷欄位輸入是否都正確
        fetch('http://20.210.96.122/api/account')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var name = false;
                var nameNull = false;
                $.each(myJson, function (key, member) {

                    if ($(".userAccount").val() == member.userAccount && member.user_Id != getCookie("user_Id")) {
                        name = true;
                        return false;

                    } else if ($(".userAccount").val().length == 0) {
                        nameNull = true;
                        return false;
                    }

                });

                if (name) {
                    $('.accoutErro').html("*此帳號已註冊*");
                    preventForm = true;
                } else {
                    $('.accoutErro').empty();
                }

                if (nameNull) {

                    $('.accoutErro').html("*帳號不能空白*");
                    preventForm = true;
                }

                // 判斷信箱
                var email = false;
                var emailNull = false;
                var emailFormat = false;
                $.each(myJson, function (key, member) {
                    if ($(".userEmail").val().length == 0) {
                        emailNull = true;
                        return false;
                    } else if ($(".userEmail").val() == member.userEmail && member.user_Id != getCookie("user_Id")) {
                        email = true;
                        return false;
                    } else if ($(".userEmail").val().search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/) == -1) {
                        emailFormat = true;
                        return false;
                    }
                });

                if (email) {
                    $('.userEmail').html("*此信箱已註冊*");
                    preventForm = true;
                } else {
                    $('.userEmail').empty();
                }

                if (emailNull) {
                    $('.userEmail').html("*信箱不能空白*");
                    preventForm = true;
                }

                if (emailFormat) {
                    $('.userEmail').html("*信箱格式錯誤*");
                    preventForm = true;
                }


            })

        if ($(".userPassword").val() != $(".psw").val()) {
            preventForm = true;
            $('.pswdErro').html("*密碼與確認密碼不相同*");
        } else {
            $('.pswdErro').empty();
        }

        setTimeout(() => {
            if (preventForm == false) {
                Swal.fire({
                    title: '修改', //標題
                    text: "確定修改嗎?", //顯示內容            
                    confirmButtonColor: '#3085d6',// 確定按鈕的 顏色
                    confirmButtonText: '確定',// 確定按鈕的 文字
                    showCancelButton: true, // 是否顯示取消按鈕
                    cancelButtonColor: '#d33', // 取消按鈕的 顏色
                    cancelButtonText: "取消", // 取消按鈕的 文字
                    focusCancel: true, // 是否聚焦 取消按鈕
                    reverseButtons: true  // 是否 反轉 兩個按鈕的位置 默認是  左邊 確定  右邊 取消
                }).then((isConfirm) => {
                    try {
                        //判斷 是否 點擊的 確定按鈕
                        if (isConfirm.value) {
                            const formdata = new FormData(document.querySelector('#userInfo'))
                            if($(".userPassword").val()==""){
                                formdata.delete('userPassword');
                            }
                            const object = {};
                            formdata.forEach((value, key) => {
                                object[key] = value;
                            });
                            object["user_Id"] =  User_Id
                            console.log(object)
                            // object[user_Id]=getCookie("user_Id");
                            // console.log(JSON.stringify(object));
                            // console.log(object)
                            fetch("http://20.210.96.122/api/account/PostAccountDetail", {
                                method: 'POST', // or 'PUT'
                                body: JSON.stringify(object),
                                headers: new Headers({
                                    'Content-Type': 'application/json'
                                })
                            }).catch(error => {
    
                                $('.btnSave').removeClass("hidden")
                                $('.fa-spinner').addClass("hidden")
                            }).then(response => {
                                if (response.status == 201) {
                                   
                                    Swal.fire({
                                        title: '編輯成功',
                                        icon: 'success',
                                        confirmButtonText: '確認'


                                    })

                                  
                                    $(".userPassword").val("");
                                    $(".psw").val("");
                                    $('.btnSave').removeClass("hidden")
                                    $('.fa-spinner').addClass("hidden")
                                }
                            })
                        } else {
                            $('.btnSave').removeClass("hidden")
                            $('.fa-spinner').addClass("hidden")
                        }
                    }
                    catch (e) {
                        alert(e);
                    }
                });


            } else {
                $('.btnSave').removeClass("hidden")
                $('.fa-spinner').addClass("hidden")

            };

        }, 100);

    });









    $("#userImg").click(function () {
        $("#file-uploader").click();
    });

const imagePreview = document.querySelector('[data-target="image-preview"]');
const spinner = document.querySelector('[data-target="spinner"]');
const fileUploader = document.querySelector('[data-target="file-uploader"]');
fileUploader.addEventListener("change", handleFileUpload);

async function handleFileUpload(e) {
    try {
        const file = e.target.files[0];
       
    
        // setUploading(true);
        if (!file) return;

        const beforeUploadCheck = await beforeUpload(file);
        if (!beforeUploadCheck.isValid) throw beforeUploadCheck.errorMessages;
      
      
        // const arrayBuffer = await getArrayBuffer(file);
        // const response = await uploadFileAJAX(arrayBuffer);


        showPreviewImage(file);
    } catch (error) {
        alert(error);
        console.log("Catch Error: ", error);
    } finally {
        e.target.value = ''; // reset input file
        // setUploading(false);
    }
}

// STEP 2: showPreviewImage with createObjectURL
// If you prefer Base64 image, use "FileReader.readAsDataURL"
function showPreviewImage(fileObj) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      
        const image=event.target.result;
        localStorage.setItem("user_img", image)
        const getImg=localStorage.getItem("user_img");
        if(getImg){
            $('.userImg').css('background-image', 'url(' + getImg + ')');
            imagePreview.setAttribute("src" , getImg) ;
        }
       
    };
    var image=fileReader.readAsDataURL(fileObj);
   
     // const image = URL.createObjectURL(fileObj);
    //  imagePreview.src = image;
}

// STEP 3: change file object into ArrayBuffer
// function getArrayBuffer(fileObj) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         // Get ArrayBuffer when FileReader on load
//         reader.addEventListener("load", () => {
//             resolve(reader.result);
//         });

//         // Get Error when FileReader on error
//         reader.addEventListener("error", () => {
//             reject("error occurred in getArrayBuffer");
//         });

//         // read the blob object as ArrayBuffer
//         // if you nedd Base64, use reader.readAsDataURL
//         reader.readAsArrayBuffer(fileObj);
//     });
// }

// STEP 4: upload file throguth AJAX
// - use "new Uint8Array()"" to change ArrayBuffer into TypedArray
// - TypedArray is not a truely Array,
//   use "Array.from()" to change it into Array
// function uploadFileAJAX(arrayBuffer) {
//     // correct it to your own API endpoint
//     return fetch("https://jsonplaceholder.typicode.com/posts/", {
//         headers: {
//             version: 1,
//             "content-type": "application/json"
//         },
//         method: "POST",
//         body: JSON.stringify({
//             imageId: 1,
//             icon: Array.from(new Uint8Array(arrayBuffer))
//         })
//     })
//         .then(res => {
//             if (!res.ok) {
//                 throw res.statusText;
//             }
//             return res.json();
//         })
//         .then(data => data)
       
//         .catch(err => console.log("err", err));
// }

// STEP 5: Create before upload checker if needed
function beforeUpload(fileObject) {
    return new Promise(resolve => {
        const validFileTypes = ["image/jpeg", "image/png"];
        const isValidFileType = validFileTypes.includes(fileObject.type);
        let errorMessages = [];

        if (!isValidFileType) {
            errorMessages.push("You can only upload JPG or PNG file!");
        }

        const isValidFileSize = fileObject.size / 1024 / 1024 < 2;
        if (!isValidFileSize) {
            errorMessages.push("Image must smaller than 2MB!");
        }

        resolve({
            isValid: isValidFileType && isValidFileSize,
            errorMessages: errorMessages.join("\n")
        });
    });
}

// function setUploading(isUploading) {
//     if (isUploading === true) {
//         spinner.classList.add("opacity-1");
//     } else {
//         spinner.classList.remove("opacity-1");
//     }
// }

// function getQueryVariable(variable) {
//     var query = window.location.search.substring(1);
//     var vars = query.split("&");
//     for (var i = 0; i < vars.length; i++) {
//         var pair = vars[i].split("=");
//         if (pair[0] == variable) {
//             return pair[1];
//         }
//     }
//     return (false);
// }







// const getImg=localStorage.getItem("user_img");
// if(getImg){
//     imagePreview.src= getImg;
// }

})
 