const NomorSurat = require("../models/NomorSurat");

// GET all
const getNomorSurats = (req, res) => {
  NomorSurat.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET by ID
const getNomorSuratById = (req, res) => {
  const { id } = req.params;
  NomorSurat.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Nomor Surat tidak ditemukan" });
    }
    res.json(result[0]);
  });
};

// CREATE
const createNomorSurat = (req, res) => {
  const data = req.body;

  NomorSurat.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: "Nomor Surat berhasil ditambahkan",
      id: result.insertId,
      ...data,
    });
  });
};

// UPDATE
const updateNomorSurat = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  NomorSurat.update(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Nomor Surat tidak ditemukan" });
    }
    res.json({
      message: "Nomor Surat berhasil diperbarui",
      id,
      ...data,
    });
  });
};

const getNomorSuratByTapel = (req, res) => { 
  const { id_tapel } = req.params;

  NomorSurat.getBytTapel(id_tapel, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results || results.length === 0) {
      return res.status(404).json({ message: "Nomor Surat tidak ditemukan untuk Tapel ini" });
    }
    res.json(results);
  });
}

// DELETE
const deleteNomorSurat = (req, res) => {
  const { id } = req.params;

  NomorSurat.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Nomor Surat tidak ditemukan" });
    }
    res.json({ message: "Nomor Surat berhasil dihapus" });
  });
};

module.exports = {
  getNomorSurats,
  getNomorSuratById,
  createNomorSurat,
  updateNomorSurat,
  deleteNomorSurat,
  getNomorSuratByTapel,
};
