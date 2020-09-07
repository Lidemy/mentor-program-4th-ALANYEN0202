/* eslint-disable no-restricted-syntax, prefer-destructuring */
/* eslint-disable no-useless-escape, no-undef, no-use-before-define,  no-restricted-globals */
function escape(toOutput) {
  return toOutput.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
}

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
        ${escape(value)}
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
  // 儲存
  $('.store').click(() => {
    const listId = $('input[name=list_id_input]').val();
    if (!listId) {
      alert('請自訂你的 list_id');
      return;
    }
    const liHTML = $('.todos').html();
    const jsonStr = JSON.stringify(liHTML);
    $.ajax({
      type: 'POST',
      url: 'http://mentor-program.co/mtr04group2/ALAN/week12/hw2/api_add_todolist.php',
      data: {
        list_id: listId,
        json_str: jsonStr,
      },
    }).done((data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      // todo
      alert(`
       your _listId is ${listId}
       要讀檔時請在網址後面加參數唷~ 例如你是 ?listId=${listId}
       `);
      $('input[name=list_id_input]').val('');
    });
  });

  // 拿取
  const url = location.href;
  let listIdStr = null;
  let id = null;

  if (url.split('?')[1]) { // 發現 ? 後面有參數
    $('input[name=list_id_input]').hide(); // 隱藏填入 id 的 input
    $('.store').hide(); // 隱藏儲存按鈕
    $('.change').removeClass('hide'); // 顯示儲存變更按鈕
    listIdStr = url.split('?')[1];
    id = listIdStr.split('=')[1];
    $.ajax({
      url: `http://mentor-program.co/mtr04group2/ALAN/week12/hw2/api_todolist.php?list_id=${id}`,
    }).done((data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      } // 成功
      const todolists = data.todolist;
      for (const todolist of todolists) {
        const json = JSON.parse(todolist.json_str);
        $('.todos').append(json);
      }
    });

    // 儲存變更
    $('.change').click(() => { // 先抓取 list_id
      listIdStr = url.split('?')[1];
      id = listIdStr.split('=')[1];
      const liHTML = $('.todos').html();
      const jsonStr = JSON.stringify(liHTML);
      $.ajax({
        type: 'POST',
        url: 'http://mentor-program.co/mtr04group2/ALAN/week12/hw2/api_update_todolist.php',
        data: {
          list_id: id,
          json_str: jsonStr,
        },
      }).done((data) => {
        if (!data.ok) {
          alert(data.message);
          return;
        }
        alert('變更成功!');
      });
    });
  }
});
