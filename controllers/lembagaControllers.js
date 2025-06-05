const LembagaModel = require("../models/Lembaga");

// GET all
const getLembagas = (req, res) => {
  LembagaModel.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET by ID
const getLembagaById = (req, res) => {
  const { id } = req.params;
  LembagaModel.getById(id, (err, result) => {
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

  LembagaModel.create(data, (err, result) => {
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

  LembagaModel.update(id, data, (err, result) => {
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

const uploadFotoLembaga = async (req, res) => {
  try {
    const id = req.params.id;
    const filePath = `/uploads/lembaga/${req.file.filename}`;

    LembagaModel.uploadFoto(id, filePath, (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Upload failed", error: err.message });
      }

      res
        .status(200)
        .json({ message: "Photo uploaded successfully", photo: filePath });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

module.exports = {
  getLembagas,
  getLembagaById,
  createLembaga,
  updateLembaga,
  uploadFotoLembaga
};
