const db = require("../connections/dbConn");

const TapelModel = {
  getAll: (callback) => {
    db.query("SELECT * FROM tapel", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM tapel WHERE id = ?", [id], callback);
  },

  create: (data, callback) => {
    db.query(
      "INSERT INTO tapel (tapel, ket) VALUES (?, ?)",
      [data.tapel, data.ket],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query(
      "UPDATE tapel SET tapel = ?, ket = ? WHERE id = ?",
      [data.tapel, data.ket, id],
      callback
    );
  },
};

module.exports = TapelModel;