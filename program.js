// Node.js의 모듈을 불러옵니다. 'userInput'이라는 파일의 모듈을 Input으로 사용합니다.
const Input = require('./userInput');

// MySQL 데이터베이스와 통신할 수 있는 'mysql' 모듈을 불러옵니다.
let mysql = require('mysql');

// MySQL 데이터베이스 연결을 설정합니다. 연결 정보는 환경 변수에서 가져옵니다.
let connection = mysql.createConnection({
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
});

// 메인 함수를 선언합니다. 비동기적으로 실행됩니다. 
async function main(){
  // 콘솔 화면을 클리어 합니다.
  console.clear();
  
  // MySQL 데이터베이스에 연결합니다.
  connection.connect();
  
  // 무한 루프를 시작합니다. 사용자가 '5'를 입력하여 프로그램을 종료하기 전까지 계속됩니다.
  while(true){
    // 메뉴를 콘솔에 출력합니다.
    console.log(`1. 데이터입력 2.데이터수정 3.데이터삭제 4.목록  5.종료`);
    
    // 사용자 입력을 기다립니다.
    let menu = await Input.getUserInput();
    
    // 사용자의 입력에 따라 다양한 작업을 수행합니다.
    if(menu==='1') { // 데이터 입력
      console.log('제목입력>');
      let title = await Input.getUserInput();
      let sql = `INSERT INTO list(title,completed) VALUES(?,false)`;
      // SQL 쿼리를 실행하여 데이터를 입력합니다.
      connection.query(sql,[title]);
    }else if(menu==='2'){ // 데이터 수정
      console.log('수정');
    }else if(menu==='3'){  // 데이터 삭제
      console.log('삭제');
    }else if(menu==='4'){  // 데이터 목록 출력
      console.log('목록');
    }else if(menu==='5'){  // 프로그램 종료
      console.log('프로그램 종료~');
      connection.end();
      process.exit();
    }else{  // 잘못된 메뉴 선택
        console.log('메뉴를 잘못 선택하셨습니다.');
    };
    
    // 1초 동안 대기합니다.
    await wait(1000);
    
    // 콘솔 화면을 다시 클리어 합니다.
    console.clear();
  };
  
};

// 메인 함수를 실행합니다.
main();

// 일정 시간 동안 대기하는 함수입니다.
const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
