/* eslint-disable no-undef */

$(document).ready(() => {
  // 新增功能
  $('.form').submit((e) => {
    e.preventDefault();
    const value = $('input[name=content]').val();
    if (!value) {
      alert('欄位不得為空~');
      return;
    }

    const html = `
    <li class="todo-list list-group-item ">
      <div class="todo-text">
        ${value}
      </div>
      <div class="button">
        <button class="done btn btn-primary">已完成</button>
        <button class="delete btn btn-danger">刪除</button>
      </div>
    </li>
    `;
    $('.todos').prepend(html);
    $('input[name=content]').val('');
  });

  // 刪除功能
  $('.todos').on('click', '.delete', (e) => {
    $(e.target).parent().parent().remove();
  });

  // 標記功能
  $('.todos').on('click', '.done', (e) => {
    const li = $(e.target).parent().parent(); // todo = 上層li
    if (li.hasClass('completed')) { // 點擊未完成時
      li.removeClass('completed');
      $(e.target).text('已完成');
      $(e.target).css('background-color', '#007bff');
    } else { // 點擊完成時
      li.addClass('completed');
      $(e.target).text('未完成');
      $(e.target).css('background-color', 'grey');
    }
  });

  // 全部清空
  $('.clean-all').click(() => {
    $('.todos').empty();
  });

  // 清空已完成
  $('.clean-done').click(() => {
    $('li').filter('.completed').remove();
  });

  // 顯示已完成
  $('.all-done').click(() => {
    $('li').show();
    $('li').not('.completed').hide();
  });

  // 顯示全部
  $('.show-all').click(() => {
    $('li').show();
  });

  // 顯示未完成
  $('.not-done').click(() => {
    $('li').show();
    $('li').filter('.completed').hide();
  });
});
