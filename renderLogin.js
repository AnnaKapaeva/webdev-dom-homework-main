// создать функцию renderLogin, она будет принимать аргумент Container как в renderMainPage.
//в это container будет помещаться форма авторизации через innerHTML
// и на кнопку в этой форме будет вешаться слушатель событи, в котором вызывается функция login 
// и затем в Then будет вызываться функция setUser и renderMainPage.

import { loginUser } from "./api.js";
import { setUser } from "./main.js";
import { renderMainPage } from "./renderMainPage.js";

export function renderLogin({container}) {
    container.innerHTML = `<div class="add-form">
<input id="name_input"
  type="text"
  class="auth-form-login"
  placeholder="Введите ваш логин"
/>
<input id="name_input"
  type="password"
  class="auth-form-password"
  placeholder="Введите ваш пароль"
/>
<div class="add-form-row">
  <button class="auth-form-button">Войти</button>
</div>
</div>`

const authButton = document.querySelector(".auth-form-button");
authButton.addEventListener('click', () => {
    const login = document.querySelector(".auth-form-login").value;
    const password = document.querySelector(".auth-form-password").value;
if (!login.trim() || !password.trim()) {
    return alert("Заполните оба поля")
}
    loginUser({login,password}).then((user) => {
setUser(user)
renderMainPage({container})
    }).catch((error) => {
alert(error.message)
    })
        })
}