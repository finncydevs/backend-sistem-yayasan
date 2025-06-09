// models/Admin.js
const db = require("../connections/dbConn.js"); 

const AdminModel = {
  getAll: (callback) => {
    db.query("SELECT * FROM admin", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM admin WHERE id = ?", [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]); // return single admin object
    });
  },

  getByUsername: (username, callback) => {
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

  uploadFoto: (id, filename, callback) => {
    db.query(
      "UPDATE admin SET photo = ? WHERE id = ?",
      [filename, id],
      callback
    );
    console.log("filename", filename);
    console.log("id", id);
  },

  update: (id, data, callback) => {
    db.query(
      "UPDATE admin SET username = ?, email = ?, password = ?, photo = ? WHERE id = ?",
      [data.username, data.email, data.password, data.photo, id],
      callback
    );
  },

  updatePassword: (id, newPassword, callback) => {
    db.query(
      "UPDATE admin SET password = ? WHERE id = ?",
      [newPassword, id],
      callback
    )
  },

  create: (data, callback) => {
    console.log("Creating admin with password:", data.password);
    db.query(
      "INSERT INTO admin (username, email, password, photo) VALUES (?,?, ?, ?)",
      [data.username, data.email, data.password, data.photo],
      callback
    );
  },
};

module.exports = AdminModel; 
