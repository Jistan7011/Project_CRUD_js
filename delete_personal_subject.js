  const Input = require('./userInput');
  let mysql = require('mysql');

  let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  async function delete_personal_subject(num){
    
  connection.connect(async(err) => {
    if (err) return console.error(err.message);
    try {
      let sql = `DELETE FROM list WHERE sub_num = ?`;
      try {
        let data = await Input.getUserInput();

        let results = await new Promise((resolve, reject) => {
          connection.query(sql, data, (error, results, fields) => {
            if (error) reject(error);
            else resolve(results);
          });
        });

        console.log('Query Results:', results);

        if (results.affectedRows > 0) {
          console.log('Rows affected:', results.affectedRows);
        } else {
          console.log('선택한 항목이 없습니다');
        }
      } catch (inputError) {
        console.log('선택한 것만 누르세요');
      }
    } catch (err) {
      console.error('사용자 입력을 가져오는 중 오류 발생:', err.message);
    } finally {
      connection.end();
    }
  });
  }
  module.exports={delete_personal_subject}
