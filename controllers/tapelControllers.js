const { stat } = require("fs");
const Tapel = require("../models/Tapel.js");

const createTapel = async (req, res) => {
  const { tapel, ket, status } = req.body;

  if (!tapel || !ket) {
    return res.status(400).json({ error: "Tahun ajaran and ket are required" });
  }

  try {
    Tapel.create({ tapel, ket, status }, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({ id: result.insertId, tapel, ket, status });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getAllTapel = async (req, res) => {
  try {
    Tapel.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    Tapel.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Tahun ajaran not found" });
      }
      res.json(result[0]);
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


const updateTapel = async (req, res) => {
  const { id } = req.params;
  const { tapel, ket, status } = req.body;

  if (!tapel || !ket) {
    return res.status(400).json({ error: "Tahun ajaran and ket are required" });
  }

  try {
    Tapel.update(id, { tapel, ket, status }, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Tahun ajaran not found" });
      res.json({ id, tapel, ket, status });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteTapel = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    Tapel.delete(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Tahun ajaran not found" });
      res.json({ message: "Tahun ajaran deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

const getTapelAktif = (req, res) => {
  Tapel.getByAktif((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};


module.exports = {
  createTapel,
  getAllTapel,
  updateTapel,
  getById,
    deleteTapel,
  getTapelAktif
};
