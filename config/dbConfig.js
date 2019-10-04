var mysql = require('mysql');
const con = mysql.createPool({
	host:process.env.MYSQL_HOST,
	user:process.env.MYSQL_USER,
	password:process.env.MYSQL_PASSWORD,
	port:process.env.MYSQL_PORT,
	database:process.env.MYSQL_DATABASE,
	timezone: 'utc'
});
con.getConnection(function(err) {
	if(!err){
		console.log('DB connect');
	}else{
		console.log("can't connect DB");
		console.log(err);
	}
});
module.exports = con;
