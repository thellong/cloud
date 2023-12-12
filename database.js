// const mysql = require('mysql');

// var connection = mysql.createConnection({
// 	host : 'localhost',
// 	database : 'testing',
// 	user : 'root',
// 	password : ''
// });

// connection.connect(function(error){
// 	if(error)
// 	{
// 		throw error;
// 	}
// 	else
// 	{
// 		console.log('MySQL Database is connected Successfully');
// 	}
// });


const Pool = require("pg").Pool;
const pool = new Pool({
user: "postgres",
host: "localhost",
database: "cloud_final",
password: "long1234",
port: 5432,
});

pool.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
  });
  module.exports = pool;