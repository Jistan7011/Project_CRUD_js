const Input = require("./userInput");
const read_subject=require('./read_subject')
let mysql = require("mysql");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function select_menu() {
  console.clear();
  while (true) { 
    console.log(`1.<수강확인 및 삭제> 2.<과목조회 및 수강신청> 3.<로그아웃>`);
    let menu = await Input.getUserInput();
    if (menu === "1") {
      console.log("수강확인 및 삭제");
    } else if (menu === "2") {
      console.log("과목조회 및 수강신청");
      read_subject.read_sjt(connection)
    } else if (menu === "3") {
      console.log("로그아웃");
      console.log("프로그램 종료~");
      connection.end();
      process.exit();
    } else {
      console.log("메뉴를 잘못 선택하셨습니다.");
    }
    // console.clear();
  }
}

// const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

async function login() {
  // console.clear();
  if (!connection || connection.state !== "connected") {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  console.log("학번을 입력하세요.");
  let num = await Input.getUserInput();
  let sql = `SELECT count(*) count FROM student where num =?`;


  return new Promise((resolve, reject) => {
    connection.query(sql, [num], (error, results, fields) => {
      if (error) return console.error(error.message);
      if (results[0].count) {
        console.log("환영합니다.");
        resolve(true);
        connection.end();
      } else {
        console.log("학생이 없습니다. 다시 입력하세요.");
        resolve(false);
        connection.end();
      }
    });
  });
}

async function run() {
  let success = false;
  while (!success) {
    success = await login();
  }
  await select_menu();
}

run();

// select_menu();