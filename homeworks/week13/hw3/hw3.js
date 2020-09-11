/* eslint-disable no-restricted-syntax,  arrow-body-style */
const clientId = 'oi4wv8trzwp7cq1aghxsu2v499xipa';
const baseUrl = 'https://api.twitch.tv/kraken';
const Accept = 'application/vnd.twitchtv.v5+json';
const template = `
<img src="$preview" class="live__img"/>
        <div class="live__footer">
          <div class="live__logo">
            <img src="$logo"/>
            <p class="game__player">"$channel"</p>
          </div>
          <div class="live__des">
            <div class="game__des">
              "$title"
            </div>
          </div>
        </div>
`;

const ul = document.querySelector('.navbar__list');

function getGames() {
  return fetch(`${baseUrl}/games/top?limit=5`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept,
      'Client-ID': clientId,
    }),
  }).then((response) => {
    return response.json();
  }).then((json) => {
    return json;
  }).catch((err) => {
    return err;
  });
}

function getStreams(name) {
  return fetch(`${baseUrl}/streams?game=${encodeURIComponent(name)}&limit=20`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept,
      'Client-ID': clientId,
    }),
  }).then((response) => {
    return response.json();
  }).then((json) => {
    return json;
  }).catch((err) => {
    return err;
  });
}

function appendStreams(streams) {
  streams.forEach((stream) => {
    const div = document.createElement('div');
    div.classList.add('live__bro');
    const content = template
      .replace('$preview', stream.preview.large)
      .replace('$logo', stream.channel.logo)
      .replace('$title', stream.channel.status)
      .replace('$channel', stream.channel.name);
    document.querySelector('.live__corner').appendChild(div);
    div.innerHTML = content;
  });
}

getGames().then((games) => {
  const topGames = games.top.map(game => game.game.name);
  for (const game of topGames) {
    const li = document.createElement('li');
    li.innerHTML = game;
    ul.appendChild(li);
  }
  getStreams(topGames[0]).then((data) => {
    appendStreams(data.streams);
  });
});

document.querySelector('.navbar__list').addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    const gameName = e.target.innerText;
    document.querySelector('.live__corner').innerHTML = '';
    getStreams(gameName).then((data) => {
      appendStreams(data.streams);
    });
  }
});
