const Lembaga = require("../models/Lembaga");

// GET all
const getLembagas = (req, res) => {
  Lembaga.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET by ID
const getLembagaById = (req, res) => {
  const { id } = req.params;
  Lembaga.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Lembaga tidak ditemukan" });
    }
    res.json(result[0]);
  });
};

// CREATE
const createLembaga = (req, res) => {
  const data = req.body;

  Lembaga.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: "Lembaga berhasil ditambahkan",
      id: result.insertId,
      ...data,
    });
  });
};

// UPDATE
const updateLembaga = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Lembaga.update(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Lembaga tidak ditemukan" });
    }

    res.json({
      message: "Lembaga berhasil diperbarui",
      id,
      ...data,
    });
  });
};

module.exports = {
  getLembagas,
  getLembagaById,
  createLembaga,
  updateLembaga,
};
