let mysql = require('mysql')

let connection = mysql.createConnection({
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
})

connection.connect((err)=>{
  if(err) return console.error(err.message);

  let sql = `insert into todos(title,completed)
  values('title',true)`;

  connection.query(sql)

  connection.end();
});