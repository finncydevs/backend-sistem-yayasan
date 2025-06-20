const db = require("../connections/dbConn");

const SPKModel = {
  getAll: (callback) => {
    db.query("SELECT * FROM satuan_pendidikan", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM satuan_pendidikan WHERE id = ?", [id], callback);
  },

  create: (data, callback) => {
    db.query(
      "INSERT INTO satuan_pendidikan (nama) VALUES (?)",
      [data.nama],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query(
      "UPDATE satuan_pendidikan SET nama = ? WHERE id = ?",
      [data.nama, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query("DELETE FROM satuan_pendidikan WHERE id = ?", [id], callback);
  },
};

module.exports = SPKModel;
