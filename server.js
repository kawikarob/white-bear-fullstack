require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bear_app",
});

connection.connect();

connection.query(
   "SELECT * FROM `memory_cards` WHERE `memory_cards`.`user_id` = 'cd977c3b-d1f3-40a6-8799-8043c7baf089' AND (`memory_cards`.`imagery` LIKE '%is%' OR `memory_cards`.`answer` LIKE '%is%') ORDER BY `memory_cards`.`created_at` ASC;",
   (err, res, fields) => {
      if (err) {
         console.log(err);
      } else {
         console.log(res);
      }
   }
);

connection.end();
