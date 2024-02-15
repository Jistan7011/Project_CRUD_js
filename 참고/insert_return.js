let mysql = require('mysql');

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) return console.error(err.message);

  // insert statment
  let sql = 'INSERT INTO todos(title, completed) VALUES ?';

  let todos = [
    ['Master Node.js MySQL', false],
    ['Build Node.js / MySQL App', true],
  ];

  // execute the insert statment
  connection.query(sql, [todos], (err, results, fields) => {
    if (err) return console.error(err.message);

    console.log(`Inserted Rows: ${results.affectedRows}`);
  });

  // close the database connection
  connection.end();
});

