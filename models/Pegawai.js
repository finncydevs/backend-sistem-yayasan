const { get } = require("mongoose");
const db = require("../connections/dbConn.js");

const PegawaiModel = {
  getAll: (callback) => {
    db.query("SELECT * FROM pegawai", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM pegawai WHERE id = ?", [id], callback);
  },

  uploadFoto: (id, filename, callback) => {
    db.query(
      "UPDATE pegawai SET photo = ? WHERE id = ?",
      [filename, id],
      callback
    );
  },
  
  getPegawaiAktif: (callback) => {
    db.query("SELECT * FROM pegawai WHERE status = 1", callback);
  },
  getPegawaiTidakAktif: (callback) => {
    db.query("SELECT * FROM pegawai WHERE status = 0", callback);
  },
  create: (data, callback) => {
    const sql = `
      INSERT INTO pegawai (
        nama, jenjang_pendidikan, jabatan, kewarganegaraan, nik, nuptk, nip, nipy, npwp, tmp_lahir, tgl_lahir,
        jk, agama, nama_ibu, status_pernikahan, nama_suami_istri, jml_anak,
        alamat, kecamatan, desa, kabupaten, provinsi, kode_pos, kontak photo, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.nama,
      data.jenjang_pendidikan,
      data.jabatan,
      data.kewarganegaraan,
      data.nik,
      data.nuptk,
      data.nip,
      data.nipy,
      data.npwp,
      data.tmp_lahir,
      data.tgl_lahir,
      data.jk,
      data.agama,
      data.nama_ibu,
      data.status_pernikahan,
      data.nama_suami_istri,
      data.jml_anak,
      data.alamat,
      data.kecamatan,
      data.desa,
      data.kabupaten,
      data.provinsi,
      data.kode_pos,
      data.kontak,
      data.photo ?? null, // Jika photo tidak dikirim, set null
      data.status,
    ];

    db.query(sql, params, callback);
  },

  update: (id, data, callback) => {
    const sql = `
      UPDATE pegawai SET
        nama = ?,jenjang_pendidikan = ?, jabatan = ?, kewarganegaraan = ?, nik = ?, nuptk = ?, nip = ?, nipy = ?, npwp = ?, 
        tmp_lahir = ?, tgl_lahir = ?, jk = ?, agama = ?, nama_ibu = ?, 
        status_pernikahan = ?, nama_suami_istri = ?, jml_anak = ?, alamat = ?, 
        kecamatan = ?, desa = ?, kabupaten = ?, provinsi = ?, kode_pos = ?, 
        kontak = ?,
        photo = ?, status = ?
      WHERE id = ?
    `;

    const params = [
      data.nama,
      data.jenjang_pendidikan,
      data.jabatan,
      data.kewarganegaraan,
      data.nik,
      data.nuptk,
      data.nip,
      data.nipy,
      data.npwp,
      data.tmp_lahir,
      data.tgl_lahir,
      data.jk,
      data.agama,
      data.nama_ibu,
      data.status_pernikahan,
      data.nama_suami_istri,
      data.jml_anak,
      data.alamat,
      data.kecamatan,
      data.desa,
      data.kabupaten,
      data.provinsi,
      data.kode_pos,
      data.kontak,
      data.photo ?? null,
      data.status,
      id,
    ];

    db.query(sql, params, callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM pegawai WHERE id = ?", [id], callback);
  },
};

module.exports = PegawaiModel;
