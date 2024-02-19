let mysql = require('mysql')
const Table = require('./make_table')

let connection = mysql.createConnection({
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
})

async function read_personal_subject(num){
  console.clear();
  let sql = `select sbj.sub_num, sbj.sub_name, sbj.sub_professor, sbj.sub_person from list as li join subject as sbj on li.sub_num = sbj.sub_num WHERE num=${num}`;
  connection.query(sql, (error, result, fields) => {
    if(error){
      console.log('error:'+error);
    } else {
      console.log('<수강 신청 목록>')
      console.log(`==========================================================================`)
      console.log(' 강의번호\t| 강의명\t     | 담당교수 \t  | 수강인원')
      console.log(`==========================================================================`)
      for(var i = 0; i < result.length; i++){
        // console.log(result[i])
        Table.make_table(result[i])
      }
    }
  });
}

read_personal_subject(4);
module.exports = {read_personal_subject};


// list에 임의의 자료 추가
function list_update(){
  for(var i=2; i<6; i++){
    for(var j=3; j<5; j++){
      for(var k=1; k<4; k++){
        let sql = `insert into list values(${i},${(j*100)+k},now())`
        console.log(sql)
        connection.query(sql)
      }
    }
  }
}

list_update(); 