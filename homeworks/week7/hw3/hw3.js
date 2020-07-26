function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

document
  .querySelector('.add-list')
  .addEventListener('keydown', (e) => {
    const inputValues = document.querySelector('input[type=text]');
    if (e.keyCode === 13) {
      if (!inputValues.value) {
        alert('請輸入內容~');
      } else {
        const div = document.createElement('div');
        div.classList.add('check__list');
        div.innerHTML = `
        <div class="list-title">
          <input class="todo__check"type="checkbox"/>
          <p class="add-text">${escapeHtml(inputValues.value)}</p>
        </div>
        <span class="delete">X</span>
      `;
        document.querySelector('.new__list').appendChild(div);
        inputValues.value = '';
      }
    }
  });

document
  .querySelector('.new__list')
  .addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      document.querySelector('.new__list').removeChild(e.target.parentNode);
      return;
    }
    if (e.target.classList.contains('todo__check')) {
      e.target.parentNode.parentNode.classList.toggle('complete');
    }
  });
