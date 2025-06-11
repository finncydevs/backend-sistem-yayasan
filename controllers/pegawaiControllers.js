const Pegawai = require("../models/Pegawai.js");

// GET semua pegawai
const getPegawais = (req, res) => {
  Pegawai.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET pegawai berdasarkan ID
const getPegawaiById = (req, res) => {
  const { id } = req.params;
  Pegawai.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Pegawai tidak ditemukan" });
    }
    res.json(result[0]);
  });
};

// CREATE pegawai baru
const createPegawai = (req, res) => {
  const data = req.body;

  // Validasi sederhana bisa ditambahkan di sini
  if (!data.nama || !data.nik) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  Pegawai.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: "Pegawai berhasil ditambahkan",
      id: result.insertId,
      ...data,
    });
  });
};

// UPDATE pegawai berdasarkan ID
const updatePegawai = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Pegawai.update(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pegawai tidak ditemukan" });
    }

    res.json({
      message: "Pegawai berhasil diperbarui",
      id,
      ...data,
    });
  });
};

// DELETE pegawai berdasarkan ID
const deletePegawai = (req, res) => {
  const { id } = req.params;

  Pegawai.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pegawai tidak ditemukan" });
    }

    res.json({ message: "Pegawai berhasil dihapus" });
  });
};

// UPLOAD foto pegawai
const uploadFotoPegawai = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Tidak ada file yang diunggah" });
  }

  const { id } = req.params;
  const filename = req.file.filename;
  Pegawai.uploadFoto(id, filename, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pegawai tidak ditemukan" });
    }

    res.json({
      message: "Foto pegawai berhasil diupload",
      filename,
    });
  });
};


const getPegawaiAktif = (req, res) => {
  Pegawai.getPegawaiAktif((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const getPegawaiTidakAktif = (req, res) => {
  Pegawai.getPegawaiTidakAktif((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = {
  getPegawais,
  getPegawaiById,
  createPegawai,
  updatePegawai,
  deletePegawai,
  uploadFotoPegawai,
  getPegawaiAktif,
  getPegawaiTidakAktif,
};
