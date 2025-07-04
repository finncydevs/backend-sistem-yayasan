const db = require("../connections/dbConn.js");

const NomorSurat = {
  getAll: (callback) => {
    db.query("SELECT * FROM nomor_surat", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM nomor_surat WHERE id = ?", [id], callback);
  },

  getBytTapel: (id_tapel, callback) => {
    db.query(
      "SELECT nomor_surat.*, tapel.tapel FROM nomor_surat INNER JOIN tapel ON nomor_surat.id_tapel = tapel.id WHERE nomor_surat.id_tapel = ?",
      [id_tapel],
      callback
    );
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO nomor_surat (id_tapel, no_surat, nama_pimpinan, tgl_sp, tmt)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
      data.id_tapel,
      data.no_surat,
      data.nama_pimpinan,
      data.tgl_sp,
      data.tmt,
    ];
    db.query(sql, params, callback);
  },

  update: (id, data, callback) => {
    const sql = `
      UPDATE nomor_surat SET
        id_tapel = ?,
        no_surat = ?,
        nama_pimpinan = ?,
        tgl_sp = ?,
        tmt = ?
      WHERE id = ?
    `;
    const params = [
      data.id_tapel,
      data.no_surat,
      data.nama_pimpinan,
      data.tgl_sp,
      data.tmt,
      id,
    ];
    db.query(sql, params, callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM nomor_surat WHERE id = ?", [id], callback);
  },
};

module.exports = NomorSurat;
