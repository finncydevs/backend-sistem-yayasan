const Tapel = require('../models/Tapel.js'); 

const createTapel = async (req, res) => { 
    const { tapel, ket } = req.body;
    
    if (!tapel || !ket) {
        return res.status(400).json({ error: 'Tahun ajaran and ket are required' });
    }
    
    try {
        Tapel.create({ tapel, ket }, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
    
        res.status(201).json({ id: result.insertId, tapel, ket });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const getAllTapel = async (req, res) => {
    try {
        Tapel.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const updateTapel = async (req, res) => {
    const { id } = req.params;
    const { tapel, ket } = req.body;

    if (!tapel || !ket) {
        return res.status(400).json({ error: 'Tahun ajaran and ket are required' });
    }

    try {
        Tapel.update(id, { tapel, ket }, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Tahun ajaran not found' });
            res.json({ id, tapel, ket });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createTapel,
    getAllTapel,
    updateTapel,
}