// db.js
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_PASSWORD,
});
console.log(process.env.DB_HOST)

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Terhubung ke MySQL");
});

module.exports = db;
