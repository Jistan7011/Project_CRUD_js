const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getUserInput() {
  return new Promise((resolve, reject) => {
    rl.question("▷  ", (answer) => {
      resolve(answer);
      // 더 이상 사용자 입력을 받지 않을 때는 아래의 주석을 해제하여 rl.close();를 호출합니다.
      // rl.close();
    });
  });
}

function getEnter() {
  return new Promise((resolve, reject) => {
    rl.on("line", (answer) => {
      resolve(answer);
      // 더 이상 사용자 입력을 받지 않을 때는 아래의 주석을 해제하여 rl.close();를 호출합니다.
      // rl.close();
    });
  });
}

function getEnterComment() {
  return new Promise((resolve, reject) => {
    rl.question("▷ 현재 페이지를 벗어나려면 엔터키를 입력하세요", (answer) => {
      resolve(answer);
      // 더 이상 사용자 입력을 받지 않을 때는 아래의 주석을 해제하여 rl.close();를 호출합니다.
      // rl.close();
    });
  });
}

module.exports = {
  getUserInput,
  getEnter,
  getEnterComment
};
