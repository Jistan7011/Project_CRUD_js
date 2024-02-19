const Input = require("./userInput");
let mysql = require("mysql");

  let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

// function delete_personal_subject(num){

// connection.connect(async(err) => {
//   if (err) return console.error(err.message);
//   try {
//     let sql = `DELETE FROM list WHERE sub_num = ?`;
//     try {
//       let data = await Input.getUserInput();

//         let results = await new Promise((resolve, reject) => {
//           connection.query(sql, data, (error, results, fields) => {
//             if (error) reject(error);
//             else resolve(results);
//           });
//         });

//       console.log('Query Results:', results);

//       if (results.affectedRows > 0) {
//         console.log('Rows affected:', results.affectedRows);
//       } else {
//         console.log('선택한 항목이 없습니다');
//       }
//     } catch (inputError) {
//       console.log('선택한 것만 누르세요');
//     }
//   } catch (err) {
//     console.error('사용자 입력을 가져오는 중 오류 발생:', err.message);
//   } finally {
//     connection.end();
//   }
// });
// }





// async function list_check(num,sub_num){
//   let check_sql='select count(*) cnt from list where num=? and sub_num=?'
//   connection.query(check_sql,[num,sub_num],(error,results,fields)=>{
//     if(error) return console.error(error.message)
    
//     if(results[0].cnt==0)
//     {
//       console.log('해당 과목은 수강신청 되어 있지 않습니다')
//       return true
//     }
//     else return false
//   })
// }

// async function delete_personal_subject(num){
//   // 연결
//   if (!connection || connection.state !== "connected") {
//     connection = mysql.createConnection({
//       host: process.env.DB_HOST,
//       port: process.env.DB_PORT,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//     });
//   }

//   // 과목번호 입력
//   console.log('수강신청취소 할 과목의 강의번호를 입력하세요')
//   let sub_num=await Input.getUserInput()

//   //수강신청 테이블에 해당 값이 없을 경우
//   if(await list_check()) connection.end()

//   //데이터 삭제
//   let sql = `DELETE FROM list WHERE num = ? and sub_num= ?`;
//   connection.query(sql, [num,sub_num], (error, results, fields) => {
//     if (error) return console.error(error.message);
//     console.log(`과목번호 ${sub_num}이(가) 수강취소 되었습니다.`);
//   });

// }




async function list_check(num,sub_num){
  let check_sql='select count(*) cnt from list where num=? and sub_num=?'
  return new Promise((resolve, reject) => {
    connection.query(check_sql,[num,sub_num],(error,results,fields)=>{
      if(error) reject(error);
      resolve(results[0].cnt === 0);
    })
  });
}

async function delete_personal_subject(num){
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
  console.log('수강신청취소 할 과목의 강의번호를 입력하세요')
  let sub_num=await Input.getUserInput()

  //수강신청 테이블에 해당 값이 없을 경우
  if(await list_check(num, sub_num)) {
    console.log('해당 과목은 수강신청 되어 있지 않습니다')
    connection.end();
    return;
  }

  //데이터 삭제
  let sql = `DELETE FROM list WHERE num = ? and sub_num= ?`;
  connection.query(sql, [num,sub_num], (error, results, fields) => {
    if (error) return console.error(error.message);
    console.log(`과목번호 ${sub_num}이(가) 수강취소 되었습니다.`);
  });

}


async function main(num){
  let exit =false
  while(!exit){
    await delete_personal_subject(num)
    console.log('수강취소를 중단하시려면 "exit"를 입력하세요')
    const a=await Input.getEnter()
    if(a.trim().toLowerCase()==="exit"){
      exit=true
    }
  }
}

module.exports={delete_personal_subject,main}
