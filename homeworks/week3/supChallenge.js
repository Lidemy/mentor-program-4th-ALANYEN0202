const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function knapsack(weight, value, W) {
  const arr = [[]]; // 創建二維陣列
  const n = weight.length - 1; // 陣列長度
  for (let i = 0; i <= W; i += 1) { // 第一列，先假如只有一件物品，小偷背包重量由 0 ~ 最大值
    if (i < weight[0]) { // 如果重量 < 第一個物品的重量
      arr[0][i] = 0; // 等於無法偷，價值為 0
    } else { // eslint-disable-next-line
      arr[0][i] = value[0]; // 不然等於(物品一)的價值
    }
  }
  for (let j = 1; j <= n; j += 1) { // 陣列長度
    for (let i = 0; i <= W; i += 1) { // 陣列寬度(小偷背包重量) 0 ~ 最大值
      if (!arr[j]) { // 創建陣列長度
        arr[j] = [];
      }
      if (i < weight[j]) { // 如果重量 < 第 2 件物品重量
        arr[j][i] = arr[j - 1][i]; // 等於前一項物品的最大值
      } else { // 不然等於，不偷 (arr[j-1][i]) 或偷 (arr[j-1][i-weight[j]]+value[j]) 的最大值
        arr[j][i] = Math.max(arr[j - 1][i], arr[j - 1][i - weight[j]] + value[j]);
      }
    }
  }
  return arr[n][W];// 回傳最後一個陣列數，即為 01 背包的最佳解。
}
function solve(input) { // 取得資料
  const [n, W] = input[0].split(' ').map(Number);
  const weight = [];
  const value = [];
  for (let i = 1; i <= n; i += 1) {
    const temp = input[i].split(' ').map(Number);
    weight.push(temp[0]);
    value.push(temp[1]);
  }
  console.log(knapsack(weight, value, W));
}
rl.on('close', () => {
  solve(lines);
});
