import mainApi from "./api";

const selectAccount = (myForm) => {  
  // 登入
  return  fetch(`${mainApi.API_URL}/user/selectAccount`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myForm),
  })
    .then(response => {
      if (!response.ok) {
        console.log("失敗")
      } 
      return response.json();
    })
    .catch(error => {
      console.error('網路請求操作出現問題:', error);
      throw error; // 抛出错误以便调用方处理
    });
}
  // 註冊
const formUpdate = (formdata) => {
  return fetch(`${mainApi.API_URL}/user/insertMemberForm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formdata
  })
    .then(response => {
      if (!response.ok) {
        console.log("失敗") 
      }
      return response.json();
    })
    .catch(error => {
      console.error('網路請求操作出現問題:', error);
      throw error; // 抛出错误以便调用方处理
    });
}

// 寄信
const sendEmail=(myForm)=>{
  return  fetch(`${mainApi.API_URL}/auth/send/email`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myForm),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('網路請求失敗');
      }
      return response.json();
    })
    .catch(error => {
      console.error('網路請求操作出現問題:', error);
      throw error; // 抛出错误以便调用方处理
    });
}
// 檢查驗證信
const checkEmail=(myForm)=>{

  return  fetch(`${mainApi.API_URL}/auth/check/email`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myForm),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('網路請求失敗');
      }
      return response.json();
    })
    .catch(error => {
      console.error('網路請求操作出現問題:', error);
      throw error; // 抛出错误以便调用方处理
    });
}
const insertMemberForm=(myForm)=>{

  return  fetch(`${mainApi.API_URL}/user/insertMemberForm`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myForm),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('網路請求失敗');
      }
      return response.json();
    })
    .catch(error => {
      console.error('網路請求操作出現問題:', error);
      throw error; // 抛出错误以便调用方处理
    });
}
const updateMemberForm=(myForm)=>{

  return  fetch(`${mainApi.API_URL}/user/updateMemberForm`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myForm),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('網路請求失敗');
      }
      return response.json();
    })
    .catch(error => {
      console.error('網路請求操作出現問題:', error);
      throw error; // 抛出错误以便调用方处理
    });
}
 
 
export { insertMemberForm,selectAccount,updateMemberForm,formUpdate,sendEmail,checkEmail }