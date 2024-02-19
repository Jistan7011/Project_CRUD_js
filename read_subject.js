// let mysql = require('mysql');

// let connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// function read_sjt(connection){
//     let sql = `SELECT * FROM subject`;
  
//     connection.query(sql, [true], (error, results, fields) => {
//       if (error) return console.error(error.message);
//       let n=0
//       console.log("과목번호 \t 과목이름 \t 최대인원 \t 학점 \t 담당교수")
//       console.log('--')
//       while(results[n])
//       {
//           console.log(`${Object.values(results[n])[0]} \t ${Object.values(results[n])[1]} \t ${Object.values(results[n])[2]} \t ${Object.values(results[n])[3]} \t ${Object.values(results[n])[4]}`)
//           n=n+1
//       }
//     });
//   }
  

// module.exports={read_sjt}


let mysql = require('mysql');
const Table = require('./make_table') //터미널 과목 정렬 예쁘게 해주는 모듈

//connection 객체 생성
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//connection 객체가 없거나 연결 상태가 connected 가 아닌 경우 연결 생성
async function read_sjt(){
  if (!connection || connection.state !== "connected") {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  //
  let sql = `select sbj.sub_num, sbj.sub_name, sbj.sub_professor, li.count, sbj.sub_person 
  from (select sub_num, count(sub_num) as count from list group by sub_num) as li 
  join subject as sbj on li.sub_num = sbj.sub_num`;

  connection.query(sql, [true], (error, results, fields) => {
    if (error) return console.error(error.message);
    let n=0
      console.log("과목번호 \t 과목이름 \t 담당교수 \t 수강인원 \t 최대수강인원")
      console.log('--------------------------------------------------------------------------------------')
      while(results[n])
      {
        Table.make_table(results[n])
          // console.log(`${Object.values(results[n])[0]} \t ${Object.values(results[n])[1]} \t ${Object.values(results[n])[2]} \t ${Object.values(results[n])[3]} \t ${Object.values(results[n])[4]}`)
          n++
      }
  });

  // close the database connection
  connection.end();
}

module.exports={read_sjt}
