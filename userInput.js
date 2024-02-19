const { rejects } = require("assert");
const { resolve } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getUserInput() {
  return new Promise((resolve, reject) => {
    rl.question("▷  ", (answer) => {
      resolve(answer);
      // question 메서드는 첫번째 파라미터로 사용자에게 보여질 문자를 입력하고
      // 두번째 파라미터로 입력받은 값을 이용한 콜백 함수를 넣음
      // 입력 받은 값은 string 으로 취급
      // console.log(answer) 의 경우 입력 받은 값 그대로 나옴
      // console.log(typeof(answer)) 의 경우 string
    });
  });
}

function getEnter() {
  return new Promise((resolve, reject) => {
    rl.on("line", (answer) => {
      resolve(answer);
      // on 메서드는 사용자가 값을 입력하고 특정 이벤트를 발생 시켰을 때 콜백 함수의 기능을 실행시킴
      // 첫번째 파라미터 line은 특정 이벤트임 line=줄바꿈 엔터를 의미함
      // 두번째 파라미터로 입력받은 값을 이용한 콜백 함수 실행
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
