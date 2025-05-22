const Penugasan = require("../models/Penugasan.js");

const getPenugasans = (req, res) => {
  Penugasan.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const getPenugasanById = (req, res) => {
  const { id } = req.params;
  Penugasan.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Penugasan tidak ditemukan" });
    }
    res.json(result[0]);
  });
};

const createPenugasan = (req, res) => {
  const data = req.body;

  Penugasan.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: "Penugasan berhasil ditambahkan",
      id: result.insertId,
      ...data,
    });
  });
};

const updatePenugasan = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Penugasan.update(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Penugasan tidak ditemukan" });
    }

    res.json({
      message: "Penugasan berhasil diperbarui",
      id,
      ...data,
    });
  });
};
const deletePenugasan = (req, res) => {
  const { id } = req.params;

  Penugasan.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Penugasan tidak ditemukan" });
    }

    res.json({
      message: "Penugasan berhasil dihapus",
      id,
    });
  });
};

module.exports = {
  getPenugasans,
  getPenugasanById,
  createPenugasan,
  updatePenugasan,
  deletePenugasan,
};