let mysql = require('mysql')
let express = require('express')
const Input = require('./userInput');

let connection = mysql.createConnection({
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
})

async function read_personal_subject(){
  console.log(`학번 : `);
  let num = await Input.getUserInput();
  // const sql = `SELECT * FROM LIST WHERE num=${num}`;
  const sql = `select sjt.sub_num '강의번호', sjt.sub_name '강의명', sjt.sub_professor '담당교수', sjt.sub_person '수강인원' from list as li join subject as sjt on li.sub_num = sjt.sub_num WHERE num=${num}`;


  connection.query(sql, (error, result, fields) => {
    
    if(error){
      console.log('error:'+error);
    } else {
      for(var i = 0; i < result.length; i++){
        console.log(result[i].sjt.sub_num + "|t" + result[i].sjt.sub_name + "|t" + result[i].sjt.sub_professor + "|t" +result[i].sjt.sub_person);
      }
    }
  });
}

read_personal_subject();