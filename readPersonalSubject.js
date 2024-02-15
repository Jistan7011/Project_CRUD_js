let mysql = require('mysql')
import {connection} from './connection'
const Input = require('./userInput');

// let connection = mysql.createConnection({
//   host:process.env.DB_HOST,
//   port:process.env.DB_PORT,
//   user:process.env.DB_USER,
//   password:process.env.DB_PASSWORD,
//   database:process.env.DB_NAME
// })

async function read_personal_subject(num){
  console.clear();
  // console.log(`학번 : `);
  // let num = await Input.getUserInput();
  let sql = `select sjt.sub_num, sjt.sub_name, sjt.sub_professor, sjt.sub_person from list as li join subject as sjt on li.sub_num = sjt.sub_num WHERE num=${num}`;
  connection.query(sql, (error, result, fields) => {
    if(error){
      console.log('error:'+error);
    } else {
      console.log('<수강 신청 목록>')
      console.log(`=========================================================`)
      console.log(`강의번호\t|강의명\t\t|담당교수\t|수강인원`);
      console.log(`=========================================================`)
      for(var i = 0; i < result.length; i++){
        console.log(result[i].sub_num + "\t\t|" + result[i].sub_name + "\t\t|" + result[i].sub_professor + "\t\t|" +result[i].sub_person);
      }
    }
  });
}

read_personal_subject(3);
module.exports = {read_personal_subject};


// list에 임의의 자료 추가
// async function list_update(){
//   for(var i=1; i<6; i++){
//     for(var j=1; j<5; j++){
//       for(var k=1; k<4; k++){
//         let sql = `insert into list values(${i},${(j*100)+k},now())`
//         // console.log(`${i}/${(j*100)+k}`)
//         connection.query(sql)
//       }
//     }
//   }
// }

// list_update();