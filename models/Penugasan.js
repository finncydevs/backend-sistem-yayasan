const db = require("../connections/dbConn");

const Penugasan = {
  getAll: (offset = 0, limit = 10, callback) => {
    const sql = `
      SELECT 
        p.*,
        t.tapel AS tahun_pelajaran,
        ns.no_surat AS nomor_surat,
        pg.nama AS nama_pegawai,
        sp.nama AS nama_satuan_pendidikan
      FROM penugasan p
      LEFT JOIN tapel t ON p.id_tapel = t.id
      LEFT JOIN nomor_surat ns ON p.id_nomor_surat = ns.id
      LEFT JOIN pegawai pg ON p.id_pegawai = pg.id
      LEFT JOIN satuan_pendidikan sp ON p.id_satuan_pendidikan = sp.id
      LIMIT ? OFFSET ?
    `;
    db.query(sql, [limit, offset], callback);
  },

  getById: (id, callback) => {
    const sql = `
      SELECT 
        p.*,
        t.tapel AS tahun_pelajaran,
        ns.no_surat AS nomor_surat,
        pg.nama AS nama_pegawai,
        sp.nama AS nama_satuan_pendidikan
      FROM penugasan p
      LEFT JOIN tapel t ON p.id_tapel = t.id
      LEFT JOIN nomor_surat ns ON p.id_nomor_surat = ns.id
      LEFT JOIN pegawai pg ON p.id_pegawai = pg.id
      LEFT JOIN satuan_pendidikan sp ON p.id_satuan_pendidikan = sp.id
      WHERE p.id = ?
    `;
    db.query(sql, [id], callback);
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO penugasan (
        id_tapel,
        id_nomor_surat,
        id_pegawai,
        id_satuan_pendidikan
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

  update: (id, data, callback) => {
    const sql = `
      UPDATE penugasan 
      SET 
        id_tapel = ?,
        id_nomor_surat = ?,
        id_pegawai = ?,
        id_satuan_pendidikan = ?
      WHERE id = ?
    `;
    const params = [
      data.id_tapel,
      data.id_nomor_surat,
      data.id_pegawai,
      data.id_satuan_pendidikan,
      id,
    ];
    db.query(sql, params, callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM penugasan WHERE id = ?", [id], callback);
  },
};

module.exports = Penugasan;
