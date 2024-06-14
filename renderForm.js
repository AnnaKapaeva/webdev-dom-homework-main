import { inItAuthButtonListener } from "./Listeners.js"
import { addComment } from "./addComment.js";
import { user } from "./main.js"

export const renderForm = ({container}) => {
container.innerHTML = user ? `<div class="add-form">
<input id="name_input"
  type="text"
  class="add-form-name"
  placeholder="Введите ваше имя"
  value="${user.user.name}"
  readonly
/>
<textarea id="comment_input" 
  type="textarea"
  class="add-form-text"
  placeholder="Введите ваш коментарий"
  rows="4"
></textarea>
<div class="add-form-row">
  <button class="add-form-button">Написать</button>
</div>
</div>` : `<div>
<button class="auth-button">Авторизуйтесь</button>
</div>`

user ? addComment() : inItAuthButtonListener({container : document.querySelector(".container")});
}