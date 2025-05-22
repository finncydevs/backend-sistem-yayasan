// db.js
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_sk",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Terhubung ke MySQL");
});

module.exports = db;
