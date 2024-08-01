export function getComments() {
   return fetch("https://wedev-api.sky.pro/api/v2/anna-kapaeva/comments", {
        method: "GET",
      })
      .then((response) => {
        return response.json();
      })
}


export function postComments({ text, name, token }) {
    return fetch("https://wedev-api.sky.pro/api/v2/anna-kapaeva/comments", {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
        }),
        headers: {'Authorization': `Bearer ${token}`}
    })
    //.then((response) => {
      //if(response.status === 201) {
       // return response.json();
     // } else{
        //return response.json().then((errorData) => {
          //if(response.status === 400) {
            //throw new Error("BadRequest: " + errorData.message);
          //} else if(response.status === 500) {
           // throw new Error("ServerUnavailable: Ошибка сервера");
          //} else{
           // throw new Error("ServerError: Сервер упал");
          //}
       // })
     // }
     // })
//}

postComments({
  text:
  name: user.user.name
  token: user.user.token
})

// создать функцию login, которая принимает логин и пароль и делает запрос на сервер

export function loginUser({login,password}) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
        login, password
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
        throw new Error("ServerError:Не удалось сделать запрос");
      }
    })
  }
  })
}