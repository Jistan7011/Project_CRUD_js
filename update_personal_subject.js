const readline = require("readline");
const Input = require('./userInput');
const rs = require("./read_subject");
let mysql = require("mysql");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function checkConditions(num, sbj_num) {
  let possible = true;

  // 0. 존재하는 과목인지
  const validPromise = new Promise((resolve, reject) => {
    let sql = `select count(*) cnt from subject 
    where subject.sub_num=?`; // 과목 테이블 에서 입력받은 값 num값의 개수(count) 확인
    connection.query(sql, [sbj_num], (err, result, fields) => {
      if (err) return reject(err);
      if (result[0].cnt === 0) { // 데이터베이스에서 결과 값을 객체로 받아옴
        //  result[0] cnt : 값  구조이 dictionary 구조이므로 .cnt(key)로 접근
        // 해당하는 값이 없는 경우 cnt===0
        possible = false;
        console.log("▶ 유효하지 않은 과목번호입니다.");
      }
      resolve();
    });
  });

  // 1. 중복 신청인지
  const dupPromise = new Promise((resolve, reject) => {
      let sql = `select count(*) cnt from list join subject 
      on list.sub_num = subject.sub_num
      where subject.sub_num=? and num=?`; //수강 신청 테이블 list에서 과목번호와 학번을 특정하여 개수를 셈 
    connection.query(sql, [sbj_num, num], (err, result, fields) => {
      if (err) return reject(err);
      if (result[0].cnt > 0) {
        possible = false;
        console.log("▶ 중복 신청은 불가합니다.");
      }
      resolve();
    });
  });
  
  // 2. 인원 초과하지 않는지
  const capacityPromise = new Promise((resolve, reject) => {
    const sql = `select count(*) cnt, sub_person from list join subject 
    on list.sub_num = subject.sub_num
    where subject.sub_num=?`;//cnt(수강 신청 테이블 list에서 특정 과목번호 count 조회==현재 신청인원) 
    //sub_person(수강 최대 인원)
    connection.query(sql, [sbj_num], (err, result, fields) => {
      if (err) return reject(err);
      // console.log(result);
      if (result[0].cnt !== 0 && result[0].cnt >= result[0].sub_person) {// 신청 인원이 0이 아닐때 and 
        //신청인원>=수강최대인원 일때
        possible = false;
        console.log("▶ 신청 인원이 마감되었습니다.");
      }
      resolve();
    });
  });

  // 3. 학점 초과하지 않는지
  const creditPromise = new Promise((resolve, reject) => {
    const sql = `select student.num num, sum(subject.sub_credit) sum, student.credit from 
    (list join student on list.num = student.num) join subject
    on list.sub_num = subject.sub_num
    where student.num=?
    group by student.num;`;// 특정 학번(num), list(수강신청 테이블)에서 특정 학번인 과목학점(sub_credit)의 합,
    // 학생 테이블에서 특정학번의 수강가능 학점(crdit)을 학번으로 그룹화함
    connection.query(sql, [num], (err, result, fields) => {
      if (err) return reject(err);
      // console.log(result);
      if (result.length !== 0 && result[0].sum >= result[0].credit) {// result.lenght(num,sum, student.credit)가 조회가 안되면
        //객체값이 비어 있기에 0을 가짐
        //즉 result.lenght 객체가 비어있지 않은 경우 and sum>=result일 경우 
        possible = false;
        console.log("▶ 이수 학점을 초과했습니다.");
      }
      resolve();
    });
  });

  await Promise.all([dupPromise, capacityPromise, creditPromise]);
  // 위에서 거친 조건들의 결과(resolve or reject)를 받아 각 조건들이 정상 수행 됬는지 Promise.all
  // console.log("통과: ", possible);
  return possible; //조건에 걸리지 않았으면 true 리턴
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
    console.log(`▶ [${result[0].sub_name}]이 신청 완료되었습니다.`);
    Input.getEnter();
  });

  connection.end();
}

async function main(num) {
  let exit = false;
  while (!exit) {
    await updateList(num);
    console.log("▶ 더이상 신청을 원하시지 않는다면 'exit'를 입력하세요.");
    const input = await Input.getEnter();
    if (input.trim().toLowerCase() === "exit") {
      exit = true;
    }
  }
  // console.log("Bye~");
  // process.exit();
  return;
}

// module.exports를 이용하여 함수를 외부로 보낸다.
// 다른 파일에서 require()를 이용하여 호출해서 사용
module.exports = { updateList, main };
