const listElement = document.querySelector(".comments");

export const renderAllComment = ({ allComment }) => {
    const allCommentHTML = allComment
    .map((allComment, index) => {
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
  };



