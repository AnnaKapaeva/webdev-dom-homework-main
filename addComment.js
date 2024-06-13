import { postApi } from "./main.js";

      export function addComment() {
        const buttonInputElement = document.querySelector(".add-form-button");
        buttonInputElement.addEventListener('click', () => {

            
    const nameInputElement = document.getElementById("name_input");
    const commentInputElement = document.getElementById("comment_input");

            nameInputElement.classList.remove("error");
            commentInputElement.classList.remove("error");
            if(nameInputElement.value === "") {
            nameInputElement.classList.add("error");
            return;
            } else if(commentInputElement.value === "") {
              commentInputElement.classList.add("error");
            return;
            }
    
            postApi(nameInputElement, commentInputElement);
            nameInputElement.value = '';
            commentInputElement.value = '';
            nameInputElement.classList.remove("error");
            commentInputElement.classList.remove("error");
        });
        
    };