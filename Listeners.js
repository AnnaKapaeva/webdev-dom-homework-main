import { renderLogin } from "./renderLogin.js";

export const inItAuthButtonListener = ({container}) => {
    const authButton = document.querySelector(".auth-button");
    authButton.addEventListener('click', () => {
renderLogin({container})
    })
}