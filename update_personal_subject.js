const readline = require("readline");
const Input = require('./userInput');
let mysql = require("mysql");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// // 입력 함수 : input과 output을 사용하기 위해서 다음과 같이 정의
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // // 입력 함수
// // function getUserInput() {
// //   return new Promise((resolve, reject) => {
// //     rl.on("line", (line) => {
// //       resolve(line);
// //     });
// //   });
// // }

async function checkConditions(num, sbj_num) {
  let possible = true;

  // 0. 존재하는 과목인지
  const validPromise = new Promise((resolve, reject) => {
    let sql = `select count(*) cnt from subject 
    where subject.sub_num=?`;
    connection.query(sql, [sbj_num], (err, result, fields) => {
      if (err) return reject(err);
      if (result[0].cnt === 0) {
        possible = false;
        console.log("▷ 유효하지 않은 과목번호입니다.");
      }
      resolve();
    });
  });

  // 1. 중복 신청인지
  const dupPromise = new Promise((resolve, reject) => {
    let sql = `select count(*) cnt from list join subject 
    on list.sub_num = subject.sub_num
    where subject.sub_num=? and num=?`;
    connection.query(sql, [sbj_num, num], (err, result, fields) => {
      if (err) return reject(err);
      if (result[0].cnt > 0) {
        possible = false;
        console.log("▷ 중복 신청은 불가합니다.");
      }
      resolve();
    });
  });
  
  // 2. 인원 초과하지 않는지
  const capacityPromise = new Promise((resolve, reject) => {
    const sql = `select count(*) cnt, sub_person from list join subject 
    on list.sub_num = subject.sub_num
    where subject.sub_num=?`;
    connection.query(sql, [sbj_num], (err, result, fields) => {
      if (err) return reject(err);
      if (result[0].cnt > result[0].sub_person) {
        possible = false;
        console.log("▷ 신청 인원이 마감되었습니다.");
      }
      resolve();
    });
  });

  // // 3. 학점 초과하지 않는지
  const creditPromise = new Promise((resolve, reject) => {
    const sql = `select count(*) cnt, credit from list join student 
    on list.num = student.num
    where student.num=?`;
    connection.query(sql, [num], (err, result, fields) => {
      if (err) return reject(err);
      if (result[0].cnt > result[0].credit) {
        possible = false;
        console.log("▷ 이수 학점을 초과했습니다.");
      }
      resolve();
    });
  });

  await Promise.all([dupPromise, capacityPromise, creditPromise]);
  // console.log("통과: ", possible);
  return possible;
}

// 메인함수
async function updateList(num) {
  // 연결
  if (!connection || connection.state !== "connected") {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  // 과목번호 입력
  console.log("▶ 수강신청할 과목번호를 입력해주세요: ");
  let sbj_num = await Input.getUserInput();

  // 수강신청 가능 조건 검사
  if (!(await checkConditions(num, sbj_num))){
    // console.log("다시 진행");
    connection.end();
    return;
  }

  // list 테이블에 수강신청 정보 추가
  sql = `INSERT INTO list(num, sub_num, li_date) 
      VALUES(?,?, now())`;
  connection.query(sql, [num, sbj_num], (err, result, fields) => {
    if (err) return console.error(err.message);
  });

  // 수강신청한 과목 정보 출력
  sql = `select * from list join subject 
    on list.sub_num = subject.sub_num
    where subject.sub_num=?`;
  connection.query(sql, [sbj_num], (err, result, fields) => {
    if (err) return console.error(err.message);
    console.log(`▶▷ [${result[0].sub_name}]이 신청 완료되었습니다.`);
  });

  connection.end();
}

async function main(num) {
  console.clear();
  let exit = false;
  while (!exit) {
    console.clear();
    await updateList(num);
    console.log("▶ 더이상 신청을 원하시지 않는다면 'exit'를 입력하세요.");
    const input = await Input.getUserInput();
    if (input.trim().toLowerCase() === "exit") {
      exit = true;
    }
  }
  console.log("Bye~");
  // process.exit();
  return;
}

// module.exports를 이용하여 함수를 외부로 보낸다.
// 다른 파일에서 require()를 이용하여 호출해서 사용
module.exports = { updateList };
module.exports = { main };
