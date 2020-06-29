const request = require('request');

const baseUrl = 'https://lidemy-book-store.herokuapp.com';
const arg = process.argv;
const cm = arg[2];
const para = arg[3];

function listBook() {
  request.get(`${baseUrl}/books?_limit=20`, (err, res, body) => {
    if (err) {
      console.log('抓取失敗', err);
      return;
    }
    let datas;
    try {
      datas = JSON.parse(body);
    } catch (error) {
      console.log('不是JSON格式', error);
      return;
    }
    for (let i = 0; i < datas.length; i += 1) {
      console.log(`${datas[i].id} ${datas[i].name}`);
    }
  });
}

function readBook(id) {
  request.get(`${baseUrl}/books/${id}`, (err, res, body) => {
    if (err) {
      console.log('抓取失敗', err);
      return;
    }
    let datas;
    try {
      datas = JSON.parse(body);
    } catch (error) {
      console.log('不是JSON格式', error);
      return;
    }
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log(`${datas.id} ${datas.name}`);
    } else {
      console.log('查無此書', res.statusCode);
    }
  });
}

function deleteBook(id) {
  request.delete(`${baseUrl}/books/${id}`, (err, res) => {
    if (err) {
      console.log('抓取失敗', err);
      return;
    }
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('刪除成功');
    } else {
      console.log('刪除失敗', res.statusCode);
    }
  });
}

function createBook(bookName) {
  request.post({
    url: `${baseUrl}/books`,
    form: {
      name: bookName,
    },
  }, (err, res, body) => {
    if (err) {
      console.log('抓取失敗', err);
      return;
    }
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('新增成功', body);
    } else {
      console.log('新增失敗', res.statusCode);
    }
  });
}

function updateBook(id) {
  request.patch({
    url: `${baseUrl}/books/${id}`,
    form: {
      name: arg[4],
    },
  }, (err, res, body) => {
    if (err) {
      console.log('抓取失敗', err);
      return;
    }
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('更新成功', body);
    } else {
      console.log('查無此書更新失敗', res.statusCode);
    }
  });
}

switch (cm) {
  case 'list':
    listBook();
    break;
  case 'read':
    readBook(para);
    break;
  case 'delete':
    deleteBook(para);
    break;
  case 'create':
    createBook(para);
    break;
  case 'update':
    updateBook(para);
    break;
  default:
    console.log('only can use [list, read, delete, create, update]');
}
