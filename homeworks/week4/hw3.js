const request = require('request');

const arg = process.argv;
const baseUrl = 'https://restcountries.eu/rest/v2';

request.get(`${baseUrl}/name/${arg[2]}`, (err, res, body) => {
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
    for (let i = 0; i < datas.length; i += 1) {
      console.log('============');
      console.log(`國家 : ${datas[i].name}`);
      console.log(`首都 : ${datas[i].capital}`);
      console.log(`貨幣 : ${datas[i].currencies[0].code}`);
      console.log(`國碼 : ${datas[i].callingCodes}`);
    }
  } else {
    console.log('找不到國家資訊', res.statusCode);
  }
});
