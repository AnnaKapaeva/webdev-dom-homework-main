export function getComments() {
   return fetch("https://wedev-api.sky.pro/api/v1/anna-kapaeva/comments", {
        method: "GET",
      })
      .then((response) => {
        return response.json();
      })
}


export function postComments({ text, name }) {
    return fetch("https://wedev-api.sky.pro/api/v1/anna-kapaeva/comments", {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
        }),
    }).then((response) => {
      if(response.status === 201) {
        return response.json();
      } else{
        return response.json().then((errorData) => {
          if(response.status === 400) {
            throw new Error("BadRequest: " + errorData.message);
          } else if(response.status === 500) {
            throw new Error("ServerUnavailable: Ошибка сервера");
          } else{
            throw new Error("ServerError: Сервер упал");
          }
        })
      }
      })
}