let mysql = require('mysql')

let connection = mysql.createConnection({
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
})

connection.connect((err)=>{
  if(err) return console.log(err.message);
  // console.log('연결성공')
  const createTodosTable = `create table if not exists todos(
                              id int primary key auto_increment,
                              title varchar(255) not null,
                              completed bool not null default false
                            )`;
  connection.query(createTodosTable,(err,result,fields)=>{
    if(err) return console.log(err.message)
    // console.log(result)
    // console.log(fields)
  });
  connection.end((err)=>{
    if(err) return console.error(err.message);
    console.log('연결해제')
  })
});