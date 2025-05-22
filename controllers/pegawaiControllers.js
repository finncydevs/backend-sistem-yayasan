const Pegawai = require("../models/Pegawai.js");

// GET all
const getPegawais = (req, res) => {
  Pegawai.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET by ID
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

// CREATE
const createPegawai = (req, res) => {
  const data = req.body;

  Pegawai.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: "Pegawai berhasil ditambahkan",
      id: result.insertId,
      ...data,
    });
  });
};

// UPDATE
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

// DELETE
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

module.exports = {
  getPegawais,
  getPegawaiById,
  createPegawai,
  updatePegawai,
  deletePegawai,
};
