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
const Table = require('./make_table')

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

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

  let sql = `SELECT * FROM subject`;

  connection.query(sql, [true], (error, results, fields) => {
    if (error) return console.error(error.message);
    let n=0
      console.log("과목번호 \t 과목이름 \t 최대인원 \t 학점 \t 담당교수")
      console.log('--')
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
