import { getComments, postComments } from "./api.js";
import { newComment } from "./newComment.js";
import { renderAllComment } from "./renderAllComment.js";
import { renderMainPage } from "./renderMainPage.js";

    const buttonInputElement = document.querySelector(".add-form-button");
    const nameInputElement = document.getElementById("name_input");
    const commentInputElement = document.getElementById("comment_input");
    const form = document.querySelector(".add-forms");

    // Получение данных с сервера

    export let user = {}
    export const setUser = (value) =>{
      user = value;
    }
    export const getApi = () => {
        return getComments().then((responseData) => {
          const form = document.querySelector(".add-forms");
          allComment = responseData.comments;
          if(form){
            form.disabled = true;
          form.style.display = "none";
          }
          
        renderAllComment({ allComment });
      })
    };
         
    // Отправление данных на сервер

   export const postApi = (nameInputElement, commentInputElement) => {
    const buttonInputElement = document.querySelector(".add-form-button");
      postComments({ 
        text: commentInputElement.value,
        name: nameInputElement.value, 
      }).then((responseData) => {
          buttonInputElement.disabled = true;
          buttonInputElement.textContent = "Комментарий отправляется..."
            return responseData;
        }).then((responseData) => {
            return fetch("https://wedev-api.sky.pro/api/v1/anna-kapaeva/comments", {
                    method: "GET",
                });
        }).then((response) => {
          return response.json();
        }).then((responseData) => {
          buttonInputElement.disabled = false;
          buttonInputElement.textContent = "Написать"
          allComment = responseData.comments;
          renderAllComment({ allComment });
          nameInputElement.value = "";
          commentInputElement.value = "";
        })
        .catch((error) => {
          if(error.message.startsWith("BadRequest:")) {
            alert("Ты сделал ошибку в запросе, исправь данные и попробуй снова");
          } else if(error.message.startsWith("ServerUnavailable:")) {
            alert("Сервер временно не работает, попробуй позднее");
          } else if(error.message.startsWith("ServerError:") || error.message.startsWith("Error:")) {
            alert("Кажется что-то пошло не так, попробуй позднее");
          } else {
            alert("Неизвестная ошибка, попробуй позднее");
          }
          console.warn(error);
        });       
};
      

    let time = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }

    let currentDateElement = new Date();

    let allComment = [];

    // const oldListHtml = listElement.innerHTML;


    export const initLikeButtonsListeners = () => {
      const likeButtonsElements = document.querySelectorAll('.like-button');
      for(const likeButtonElement of likeButtonsElements) {
        likeButtonElement.addEventListener('click', (event) => {
          event.stopPropagation();
          const index = likeButtonElement.dataset.index;
           allComment[index].isLiked = ! allComment[index].isLiked;
          if(allComment[index].isLiked) {
            allComment[index].likes += 1;
          } else {
            allComment[index].likes -= 1;
          }
          renderAllComment({ allComment });
        });
      }
    };
    
    renderMainPage({container : document.querySelector(".container")})


        
    