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

function getGames(cb) {
  const request = new XMLHttpRequest();
  request.open('GET', `${baseUrl}/games/top?limit=5`, true);
  request.setRequestHeader('Accept', Accept);
  request.setRequestHeader('Client-ID', clientId);

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      cb(JSON.parse(request.responseText));
    }
  };
  request.send();
}

function getStreams(name, cb) {
  const request = new XMLHttpRequest();
  request.open('GET', `${baseUrl}/streams?game=${encodeURIComponent(name)}&limit=20`, true);
  request.setRequestHeader('Accept', Accept);
  request.setRequestHeader('Client-ID', clientId);

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      cb(JSON.parse(request.responseText));
    }
  };
  request.send();
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

getGames((games) => { // eslint-disable-next-line
  const topGames = games.top.map((game) => game.game.name); // eslint-disable-next-line
  for (const game of topGames) {
    const li = document.createElement('li');
    li.innerHTML = game;
    ul.appendChild(li);
  }
  getStreams(topGames[0], (data) => {
    appendStreams(data.streams);
  });
});

document.querySelector('.navbar__list').addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    const text = e.target.innerText;
    document.querySelector('.live__corner').innerHTML = '';
    getStreams(text, (data) => {
      appendStreams(data.streams);
    });
  }
});
