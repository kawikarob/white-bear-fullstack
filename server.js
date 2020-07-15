require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bear_app",
});

connection.connect();

funci;

connection.query(
   `
   SELECT 
	   id , email, created_at
   FROM 
	   users
   WHERE 
	   email = 'kawika@gmail.com'
		AND password = 'replace_me'
   LIMIT 1;
    `,
   (err, res, fields) => {
      if (err) {
         console.log(err);
      } else {
         console.log(res);
      }
   }
);

connection.end();
