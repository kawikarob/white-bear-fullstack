require("dotenv").config();
const nodeUtil = require("util");
const mysql = require("mysql");

const db = mysql.createPool({
   connectionLimit: 10,
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bear_app",
});

// https://medium.com/@mhagemann/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
db.query = nodeUtil.promisify(db.query);

module.exports = db;
