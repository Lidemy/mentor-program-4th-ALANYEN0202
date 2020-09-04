/* eslint-disable no-restricted-syntax, prefer-destructuring */
/* eslint-disable no-useless-escape, no-undef, no-use-before-define */
function escape(toOutput) {
  return toOutput.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
}

function appendCommentsToDOM(container, comment, isPrepend) {
  const html = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${escape(comment.nickname)}</h5>
        <p class="card-text">${escape(comment.content)}</p>
      </div>
    </div>
    `;
  if (!isPrepend) {
    container.append(html);
  } else {
    container.prepend(html);
  }
}

function getCommentsAPI(sitekey, before, cb) {
  let url = `http://mentor-program.co/mtr04group2/ALAN/week12/hw1/api_comments.php?site_key=${sitekey}`;
  if (before) {
    url += `&before=${before}`;
  }
  $.ajax({
    url,
  }).done((data) => {
    cb(data);
  });
}

const sitekey = 'alan';
const buttonToLoadMore = '<button class="load-more btn btn-primary">載入更多</button>';
let lastId = null;
let isEnd = false;

$(document).ready(() => {
  const container = $('.comments');
  getComments();

  $('.comments').on('click', '.load-more', () => {
    getComments();
  });
  $('.add-comment-form').submit((e) => {
    e.preventDefault();
    const postData = {
      site_key: 'alan',
      nickname: $('input[name=nickname]').val(),
      content: $('textarea[name=content]').val(),
    };
    $.ajax({
      type: 'POST',
      url: 'http://mentor-program.co/mtr04group2/ALAN/week12/hw1/api_add_comments.php',
      data: postData,
    }).done((data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      appendCommentsToDOM(container, postData, true);
      $('input[name=nickname]').val('');
      $('textarea[name=content]').val('');
    });
  });
});
function getComments() {
  if (isEnd) {
    return;
  }
  $('.load-more').hide();
  const container = $('.comments');
  getCommentsAPI(sitekey, lastId, (data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    }
    const comments = data.discussions;
    for (const comment of comments) {
      appendCommentsToDOM(container, comment);
    }
    const length = comments.length;
    if (length < 5) {
      isEnd = true;
    } else {
      lastId = comments[length - 1].id;
      $('.comments').append(buttonToLoadMore);
    }
  });
}
