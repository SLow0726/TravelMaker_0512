function addNewTravel() {
  var url = 'http://20.210.96.122/api/Travel/AddTravel';

  var data = {};

  function tData(travelData, callback) {
    setTimeout(callback, 1000, travelData)
  }
  function callbackData(travelData) {
    console.log(JSON.stringify(attractionIndexList))
    console.log(travelData)

    data = {
      'travelOwner': userID,
      'DATA': JSON.stringify(travelData),
      'travelCity': '台南市',
      'travelType': '開車',
      'attractionReferral': JSON.stringify(attractionIndexList),
      'travelMap': JSON.stringify(attractionShowArray),
      'travelTitle': travelTitle,
    };
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response)
        return response;
      }).then(json => {
        attractionOwner = json.travel_Id;
        attractionOwnerList.push(String(attractionOwner))
        user_Info.travelOwner = attractionOwnerList.join()
        $.cookie('user_Info', JSON.stringify(user_Info))
        Swal.fire({
          title: '地圖儲存成功',
          icon: 'success',
          confirmButtonText: '確認'
      
      }).then((isConfirm)=>{
        try {
          //判斷 是否 點擊的 確定按鈕
          if (isConfirm.value) {
            location.href="shopChart.html"
          
          }
      }
      catch (e) {
          alert(e);
      }
      })

      })
  }

  tData(travelData, callbackData)


}


function editTravel(travel_Id) {
  var url = 'http://20.210.96.122/api/Travel/EditTravel'
  var data = {};

  function tData(travelData, callback) {
    setTimeout(callback, 1000, travelData)
  }
  function callbackData(travelData) {
    console.log(JSON.stringify(attractionIndexList))
    console.log(travelData)

    data = {
      'travel_Id': travel_Id,
      'travelOwner': userID,
      'DATA': JSON.stringify(travelData),
      'travelCity': '台南市',
      'travelType': '開車',
      'attractionReferral': JSON.stringify(attractionIndexList),
      'travelMap': JSON.stringify(attractionShowArray),
      'travelTitle': travelTitle,
    };
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response)
        return response;
      }).then(json => {
        attractionOwner = json.travel_Id;

        Swal.fire({
          title: '地圖編輯成功',
          icon: 'success',
          confirmButtonText: '確認'
      
      }).then((isConfirm)=>{
        try {
          //判斷 是否 點擊的 確定按鈕
          if (isConfirm.value) {
            location.href="shopChart.html"
          
          }
      }
      catch (e) {
          alert(e);
      }
      })

      })
  }

  tData(travelData, callbackData)


}

function renewAccountDetail(data) {
  const formData = new FormData();
  formData.append('travelOwner', data)
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
    })
}