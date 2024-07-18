import { initLikeButtonsListeners, user } from "./main.js";
import { newComment } from "./newComment.js";
import {format} from "date-fns"


export const renderAllComment = ({ allComment }) => {
  const listElement = document.querySelector(".comments");
    const allCommentHTML = allComment
    .map((allComment, index) => {
      let currentDateElement = new Date(allComment.date);
      //const timing = currentDateElement.toLocaleDateString() + ' ' + currentDateElement.getHours() + ':' + currentDateElement.getMinutes();
      const timing=
      format(currentDateElement, "yyyy-MM-dd hh.mm.ss")
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

    if (user) {
      newComment();
      initLikeButtonsListeners();
    }
  };



