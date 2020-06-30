const request = require('request');

const baseUrl = 'https://api.twitch.tv/kraken';
const clientId = 'oi4wv8trzwp7cq1aghxsu2v499xipa';

request({
  method: 'GET',
  url: `${baseUrl}/games/top`,
  headers: {
    'Client-ID': clientId,
    Accept: 'application/vnd.twitchtv.v5+json',
  },
}, (err, res, body) => {
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
  }// eslint-disable-next-line
  for (const games of datas.top) {
    console.log(`${games.viewers} ${games.game.name}`);
  }
});
