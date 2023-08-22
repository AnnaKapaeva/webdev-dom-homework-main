import { getComments, postComments } from "./api.js";

const buttonInputElement = document.querySelector(".add-form-button");
    const nameInputElement = document.getElementById("name_input");
    const commentInputElement = document.getElementById("comment_input");
    const listElement = document.querySelector(".comments");
    const form = document.querySelector(".add-forms");

    // Получение данных с сервера

    const getApi = () => {
        getComments().then((responseData) => {
          allComment = responseData.comments;
          form.disabled = true;
          form.style.display = "none";
        renderAllComment();
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
          renderAllComment();
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
      

    let years = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };

    let time = {
      hour: 'numeric',
      minute: 'numeric'
    };

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
          renderAllComment();
        });
      }
    };
    initLikeButtonsListeners();


    const renderAllComment = () => {
      const allCommentHTML = allComment.map((allComment, index) => {
        let currentDateElement = new Date(allComment.date);
        const timing = currentDateElement.toLocaleDateString() + ' ' + currentDateElement.getHours() + ':' + currentDateElement.getMinutes();
        return `<li  class="comment">
          <div class="comment-header">
            <div>${allComment.author.name}</div>
            <div>${timing}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${allComment.text}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${allComment.likes}</span>
              <button class="like-button ${allComment.isLiked ? '-active-like' : ''}" data-index = ${index}></button>
            </div>
          </div>
        </li>`
      }).join(``);
      listElement.innerHTML = allCommentHTML;
      initLikeButtonsListeners();
    };
     renderAllComment();
   

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

        // Ответ на комментарий

        const newComment = () => {
        const commentElement = document.querySelectorAll('.comment');
        const inputComment = document.querySelector('.add-form-text');
        commentElement.forEach(commentElement => {
          commentElement.addEventListener('click', () => {
            inputComment.value = ">" + commentElement.innerText;
          });
        });
      }
        newComment();
        getApi();
        addComment();
        renderAllComment();
        nameInputElement.value = "";
        commentInputElement.value = "";
        nameInputElement.classList.remove("error");
        commentInputElement.classList.remove("error");