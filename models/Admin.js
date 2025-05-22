// models/Admin.js
const db = require("../connections/dbConn.js"); 

const AdminModel = {
  getAll: (callback) => {
    db.query("SELECT * FROM admin", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM admin WHERE id = ?", [id], callback);
  },

  getByUsername: (username, callback) => {
    console.log("Callback getByUsername triggered");
    db.query(
      "SELECT * FROM admin WHERE username = ?",
      [username],
      (err, results) => {
        if (err) return callback(err, null);
        if (results.length === 0) return callback(null, null);
        callback(null, results[0]);
      }
    );
  },
  update: (id, data, callback) => {
    db.query(
      "UPDATE admin SET username = ?, password = ?, photo = ? WHERE id = ?",
      [data.username, data.password, data.photo, id],
      callback
    );
  },

  create: (data, callback) => {

    console.log("Creating admin with password:", data.password);
    db.query(
      "INSERT INTO admin (username, password, photo) VALUES (?, ?, ?)", 
      [data.username, data.password, data.photo],
      callback
    );
  },
};

module.exports = AdminModel; 
