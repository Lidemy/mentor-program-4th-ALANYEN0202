const container = document.querySelector('.back');
const info = document.querySelector('.info');
const url = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const errorMessage = '系統不穩定，請再試一次';

function lotto(className, str) {
  const div = document.createElement('div');
  div.classList.add(className);
  div.innerHTML = `
  <div class="price__str">
   <h2>${str}</h2>
   <div class="button__name" onclick="javascript:window.location.reload()">
    我要抽獎
   </div>
  </div>
  `;
  return div;
}

function getPrize(cb) {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const response = request.responseText;
      let json;
      try {
        json = JSON.parse(response);
      } catch (error) {
        cb(errorMessage);
        return;
      }

      if (!json.prize) {
        cb(errorMessage);
        return;
      }

      cb(null, json);
    } else {
      cb(errorMessage);
    }
  };
  request.onerror = function err() {
    cb(errorMessage);
  };

  request.send();
}

document
  .querySelector('.button__name')
  .addEventListener('click', () => {
    getPrize((err, json) => {
      if (err) {
        alert(err);
        return;
      }

      if (json.prize === 'FIRST') {
        container.removeChild(info);
        const div = lotto('banner__first', '恭喜你中頭獎了 ! 日本東京來回雙人遊 !');
        container.appendChild(div);
      } else if (json.prize === 'SECOND') {
        container.removeChild(info);
        const div = lotto('banner__second', '二獎！90 吋電視一台！');
        container.appendChild(div);
      } else if (json.prize === 'THIRD') {
        container.removeChild(info);
        const div = lotto('banner__third', '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！');
        container.appendChild(div);
      } else if (json.prize === 'NONE') {
        container.removeChild(info);
        const div = lotto('banner__none', '銘謝惠顧');
        container.appendChild(div);
      }
    });
  });
