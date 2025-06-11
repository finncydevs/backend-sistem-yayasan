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
      callback(null, results[0] || null);
    });
  },

  getByUsername: (username, callback) => {
    db.query(
      "SELECT * FROM admin WHERE username = ?",
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
      "UPDATE admin SET username = ?, email = ?, photo = ? WHERE id = ?",
      [data.username, data.email, data.photo, id],
      callback
    );
  },

  updatePassword: (id, hashedNewPassword, callback) => {
    db.query(
      "UPDATE admin SET password = ? WHERE id = ?",
      [hashedNewPassword, id],
      (err, result) => {
        if (err) {
          console.error("Database update error:", err);
          return callback(err);
        }
        callback(null, result);
      }
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM admin WHERE id = ?", [id], callback);
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
