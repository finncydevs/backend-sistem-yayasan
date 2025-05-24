const db = require("../connections/dbConn.js");

const LembagaModel = {
  getAll: (callback) => {
    db.query("SELECT * FROM profil_lembaga", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM profil_lembaga WHERE id = ?", [id], callback);
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO profil_lembaga (
        nama,
        npyn,
        thn_berdiri,
        luas,
        moto,
        logo,
        alamat,
        desa,
        kecamatan,
        kabupaten,
        provinsi,
        kode_pos,
        telepon,
        fax,
        email,
        situs_web,
        facebook,
        youtube,
        tiktok
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.nama,
      data.npyn,
      data.thn_berdiri,
      data.luas,
      data.moto,
      data.logo,
      data.alamat,
      data.desa,
      data.kecamatan,
      data.kabupaten,
      data.provinsi,
      data.kode_pos,
      data.telepon,
      data.fax,
      data.email,
      data.situs_web,
      data.facebook,
      data.youtube,
      data.tiktok,
    ];

    db.query(sql, params, callback);
  },

  update: (id, data, callback) => {
    const sql = `
      UPDATE profil_lembaga SET
        nama = ?,
        npyn = ?,
        thn_berdiri = ?,
        luas = ?,
        moto = ?,
        logo = ?,
        alamat = ?,
        desa = ?,
        kecamatan = ?,
        kabupaten = ?,
        provinsi = ?,
        kode_pos = ?,
        telepon = ?,
        fax = ?,
        email = ?,
        situs_web = ?,
        facebook = ?,
        youtube = ?,
        tiktok = ?
      WHERE id = ?
    `;

    const params = [
      data.nama,
      data.npyn,
      data.thn_berdiri,
      data.luas,
      data.moto,
      data.logo,
      data.alamat,
      data.desa,
      data.kecamatan,
      data.kabupaten,
      data.provinsi,
      data.kode_pos,
      data.telepon,
      data.fax,
      data.email,
      data.situs_web,
      data.facebook,
      data.youtube,
      data.tiktok,
      id,
    ];

    db.query(sql, params, callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM profil_lembaga WHERE id = ?", [id], callback);
  },
};

module.exports = LembagaModel;
