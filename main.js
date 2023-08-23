import { getComments, postComments } from "./api.js";
import { newComment } from "./newComment.js";
import { renderAllComment } from "./renderAllComment.js";

    const buttonInputElement = document.querySelector(".add-form-button");
    const nameInputElement = document.getElementById("name_input");
    const commentInputElement = document.getElementById("comment_input");
    const form = document.querySelector(".add-forms");

    // Получение данных с сервера

    const getApi = () => {
        getComments().then((responseData) => {
          allComment = responseData.comments;
          form.disabled = true;
          form.style.display = "none";
        renderAllComment({ allComment });
      })
    };
        
      
    // Отправление данных на сервер

    const postApi = (nameInputElement, commentInputElement) => {
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


    const initLikeButtonsListeners = () => {
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
    initLikeButtonsListeners();

   

      buttonInputElement.addEventListener('click', addComment);
      function addComment() {
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
    };


        newComment();
        getApi();
        addComment();
        renderAllComment({ allComment });
        nameInputElement.value = "";
        commentInputElement.value = "";
        nameInputElement.classList.remove("error");
        commentInputElement.classList.remove("error");