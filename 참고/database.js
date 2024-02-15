const mysql = require('mysql');

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function insertRecord(data) {
  return new Promise((resolve, reject) => {
    let insertQuery = `INSERT INTO your_table_name (column1, column2, column3) VALUES (?, ?, ?)`;
    let insertData = [data.value1, data.value2, data.value3];

    connection.query(insertQuery, insertData, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function closeDatabaseConnection() {
  connection.end();
}

module.exports = {
  connectToDatabase,
  insertRecord,
  closeDatabaseConnection
};