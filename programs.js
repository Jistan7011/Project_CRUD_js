const Input = require('./userInput');
let mysql = require('mysql');

let connection = mysql.createConnection({
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
});

async function select_menu(){
  console.clear();
  connection.connect();
  while(true){
    console.log(`1. 데이터입력 2.데이터수정 3.데이터삭제 4.목록  5.종료`);
    let menu = await Input.getUserInput();
    if(menu==='1') {
      console.log('제목입력>');
      let title = await Input.getUserInput();
      console.log('');
      let sql = `INSERT INTO todos(title,completed) VALUES(?,false)`;
      connection.query(sql,[title]);
    }else if(menu==='2'){
      console.log('수정');
    }else if(menu==='3'){    
      console.log('삭제');
    }else if(menu==='4'){ 
      console.log('목록');
    }else if(menu==='5'){ 
      console.log('프로그램 종료~');
      connection.end();
      process.exit();
    }else{ 
        console.log('메뉴를 잘못 선택하셨습니다.');
    };
    await wait(1000);
    console.clear();
  };
};

// const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

async function login(){
  console.clear();
  if (!connection || connection.state !== "connected") {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });}
  
  let num = await Input.getUserInput();
  let sql = `SELECT count(*) count FROM student where num =?`;
  
  connection.query(sql, [num], (error, results, fields) =>{
    if (error) return console.error(error.message);
    if (results[0].count) {
      console.log('환영합니다.')
      connection.end();
      return (true)
    } else {
      console.log('학생이 없습니다. 다시 입력하세요.')
      connection.end();
      return (false)
    }
  })
};

async function run(){
  let success = false;
  while(!success){
    success = await login()
    console.log(">")
  };
  await select_menu(num)
};
  run();
  // select_menu();

