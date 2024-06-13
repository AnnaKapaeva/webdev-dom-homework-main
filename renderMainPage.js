import { getApi } from "./main.js"
import { renderForm } from "./renderForm.js"

export const renderMainPage = ({container}) => {
container.innerHTML = `<ul class="comments">
    
</ul>
<div class="add-forms">Загрузка...</div>
<div class="form"></div>`
getApi().then(() => {
    renderForm({container : document.querySelector(".form")})
})
}