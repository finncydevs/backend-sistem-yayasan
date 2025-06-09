const db = require("../connections/dbConn.js");

const AdminModel = {
  getAll: (callback) => {
    db.query("SELECT * FROM admin", (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM admin WHERE id = ?", [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0] || null); // Consistent null return for not found
    });
  },

  getByUsername: (username, callback) => {
    db.query(
      "SELECT id, username, email, password, photo FROM admin WHERE username = ?",
      [username],
      (err, results) => {
        if (err) return callback(err);
        callback(null, results[0] || null);
      }
    );
  },

  uploadFoto: (id, filename, callback) => {
    db.query(
      "UPDATE admin SET photo = ? WHERE id = ?",
      [filename, id],
      callback
    );
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
    );
  },

  create: (data, callback) => {
    db.query(
      "INSERT INTO admin (username, email, password, photo) VALUES (?, ?, ?, ?)",
      [data.username, data.email, data.password, data.photo],
      callback
    );
  },
};

module.exports = AdminModel;
