const db = require("../connections/dbConn");


const PenugasanModel = {
  getAll: (callback) => {
    db.query("SELECT * FROM penugasan", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM penugasan WHERE id = ?", [id], callback);
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO penugasan (
      id_tapel,
      id_nomor_surat,
        id_pegawai,
        id_satuan_pendidikan,
      ) VALUES (?, ?, ?, ?)
    `;

    const params = [
      data.id_tapel,
      data.id_nomor_surat,
      data.id_pegawai,
      data.id_satuan_pendidikan,
    ];
    db.query(sql, params, callback);
  },
};
