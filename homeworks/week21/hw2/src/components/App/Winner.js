/* eslint-disable no-plusplus, no-param-reassign, consistent-return */

function countStep(n, init) {
  if (n === 0) {
    n = init ? 1 : -1;
    init = init ? !init : init; // => 一旦初始化就設成 false
  } else {
    n = n > 0 ? n + 1 : n - 1;
  }
  return [n, init];
}

export default function calculateWinner({ board, position, type }) {
  const [x, y] = position;
  if (position.length) {
    let n = 0;
    let credit = 0;
    let end = 0;
    let init = true;

    while (end < 2 && credit < 5) {
      [n, init] = countStep(n, init);

      if (type === 'row') {
        // 左右
        if (board[x][y] && board[x][y] === board[x][y + n]) {
          credit++;
        } else {
          end++;
        }
      }

      if (type === 'column') {
        // 上下
        if (board[x + n] !== undefined) {
          if (board[x][y] && board[x][y] === board[x + n][y]) {
            credit++;
          } else {
            end++;
          }
        } else {
          end++;
        }
      }

      if (type === 'leftUpSlash') {
        // 左上、右下
        if (board[x + n] !== undefined) {
          if (board[x][y] && board[x][y] === board[x + n][y + n]) {
            credit++;
          } else {
            end++;
          }
        } else {
          end++;
        }
      }

      if (type === 'rightUpSlash') {
        // 右上、左下
        if (board[x + n] !== undefined && board[x - n] !== undefined) {
          if (board[x][y] && board[x][y] === board[x - n][y + n]) {
            credit++;
          } else {
            end++;
          }
        } else {
          end++;
        }
      }

      // 碰到牆往反方向找
      if (end >= 1 && n >= 1) n = 0;
    }
    if (credit < 4) return null;
    return board[x][y];
  }
}
