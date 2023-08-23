// Ответ на комментарий

export const newComment = () => {
    const commentElement = document.querySelectorAll('.comment');
    const inputComment = document.querySelector('.add-form-text');
    commentElement.forEach(commentElement => {
      commentElement.addEventListener('click', () => {
        inputComment.value = ">" + commentElement.innerText;
      });
    });
  }