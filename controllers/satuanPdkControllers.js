const SatuanPdk = require("../models/SatuanPdk");

// GET all
const getSatuanPdks = (req, res) => {
  SatuanPdk.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET by ID
const getSatuanPdkById = (req, res) => {
  const { id } = req.params;
  SatuanPdk.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Satuan tidak ditemukan" });
    }
    res.json(result[0]);
  });
};

// CREATE
const createSatuanPdk = (req, res) => {
  const data = req.body;
  if (!data.nama) {
    return res.status(400).json({ message: "Field 'nama' wajib diisi" });
  }

  SatuanPdk.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: "Satuan berhasil ditambahkan",
      id: result.insertId,
      ...data,
    });
  });
};

// UPDATE
const updateSatuanPdk = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  SatuanPdk.update(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Satuan tidak ditemukan" });
    }

    res.json({
      message: "Satuan berhasil diperbarui",
      id,
      ...data,
    });
  });
};

// DELETE
const deleteSatuanPdk = (req, res) => {
  const { id } = req.params;

  SatuanPdk.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Satuan tidak ditemukan" });
    }

    res.json({ message: "Satuan berhasil dihapus" });
  });
};

module.exports = {
  getSatuanPdks,
  getSatuanPdkById,
  createSatuanPdk,
  updateSatuanPdk,
  deleteSatuanPdk,
};
