// db.js
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_DATABASE)

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Terhubung ke MySQL");
});

module.exports = db;
