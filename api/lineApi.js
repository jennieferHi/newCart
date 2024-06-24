import mainApi from "./api";

const getLineApi = (linePay) => {  
  // 登入
  return  fetch(`${mainApi.API_URL}/linePayBox`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(linePay),
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
 

 
export { getLineApi }