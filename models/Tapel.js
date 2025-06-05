const { get } = require("mongoose");
const db = require("../connections/dbConn");

const Tapel = {
  getAll: (callback) => {
    db.query("SELECT * FROM tapel", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM tapel WHERE id = ?", [id], callback);
  },

  getByAktif: ( zcallback) => {
    db.query("SELECT * FROM tapel WHERE status = 1", callback);
  },

  create: (data, callback) => {
    db.query(
      "INSERT INTO tapel (tapel, ket, status) VALUES (?, ?, ?)",
      [data.tapel, data.ket, data.status],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query(
      "UPDATE tapel SET tapel = ?, ket = ?, status = ? WHERE id = ?",
      [data.tapel, data.ket, data.status, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query("DELETE FROM tapel WHERE id = ?", [id], callback);
  },
};

module.exports = Tapel;