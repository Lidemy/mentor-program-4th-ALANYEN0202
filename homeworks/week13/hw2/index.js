/* eslint-disable no-restricted-syntax, prefer-destructuring */
/* eslint-disable no-useless-escape, no-undef, no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies, prefer-const */
/* eslint-disable import/prefer-default-export */
import $ from 'jquery';
import { getComments, addComments } from './api';
import { appendCommentsToDOM, appendStyle } from './utils';
import { cssTemplate, getLoadMore, getForm } from './template';

export function init(options) {
  let sitekey = '';
  let apiUrl = '';
  let lastId;
  let containerElement;
  let isEnd = false;
  let loadMoreClassName;
  let commentsClassName;
  let commentsSelector;
  let formClassName;
  let formSelector;

  sitekey = options.sitekey;
  apiUrl = options.apiUrl;
  loadMoreClassName = `${sitekey}-load-more`;
  commentsClassName = `${sitekey}-comments`;
  commentsSelector = `.${commentsClassName}`;
  formClassName = `${sitekey}-add-comment-form`;
  formSelector = `.${formClassName}`;

  containerElement = $(options.containerSelector);
  containerElement.append(getForm(formClassName, commentsClassName));
  appendStyle(cssTemplate);

  const container = $(commentsSelector);
  getNewComments();

  $(commentsSelector).on('click', `.${loadMoreClassName}`, () => {
    getNewComments();
  });
  $(formSelector).submit((e) => {
    e.preventDefault();
    const nicknameDOM = $(`${formSelector} input[name=nickname]`);
    const contentDOM = $(`${formSelector} textarea[name=content]`);
    const postData = {
      site_key: sitekey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val(),
    };
    addComments(apiUrl, sitekey, postData, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      appendCommentsToDOM(container, postData, true);
      nicknameDOM.val('');
      contentDOM.val('');
    });
  });
  function getNewComments() {
    if (isEnd) {
      return;
    }
    $(`.${loadMoreClassName}`).hide();
    const containers = $(commentsSelector);
    getComments(apiUrl, sitekey, lastId, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      const comments = data.discussions;
      for (const comment of comments) {
        appendCommentsToDOM(containers, comment);
      }
      const length = comments.length;
      if (length < 5) {
        isEnd = true;
      } else {
        lastId = comments[length - 1].id;
        const loadMoreButtonHTML = getLoadMore(loadMoreClassName);
        $(commentsSelector).append(loadMoreButtonHTML);
      }
    });
  }
}
