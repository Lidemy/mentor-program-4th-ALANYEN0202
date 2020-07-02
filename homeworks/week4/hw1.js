const request = require('request');

const basrUrl = 'https://lidemy-book-store.herokuapp.com';

request(`${basrUrl}/books?_limit=10`, (err, res, body) => {
  if (err) {
    console.log('抓取失敗', err);
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
