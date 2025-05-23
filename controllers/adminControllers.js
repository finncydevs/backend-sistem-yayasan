const Admin = require("../models/Admin.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

// Helper: Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });
};
const createAdmin = async (req, res) => {
  try {
    const { username, password, photo } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    // Check for existing admin
    const existingAdmin = await new Promise((resolve, reject) => {
      Admin.getByUsername(username, (err, admin) => {
        if (err) reject(err);
        resolve(admin);
      });
    });

    if (existingAdmin) {
      return res.status(409).json({ error: "Username taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await new Promise((resolve, reject) => {
      Admin.create(
        { username, password: hashedPassword, photo },
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    const token = generateToken(result.insertId);
    res.status(201).json({ id: result.insertId, username, photo, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  console.log("Request body:", req.body);

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  Admin.getByUsername(username, async (err, admin) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    console.log("Password input:", password);
    console.log("Password hash DB:", admin.password);

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("isMatch result:", isMatch);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    console.log(password, admin.password);
    const token = generateToken(admin.id);
    res.json({ id: admin.id, username: admin.username, token });
  });
};

const getAdmins = async (req, res) => {
  Admin.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

const getAdminById = async (req, res) => {
  Admin.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(result[0]);
  });
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, password, photo } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    Admin.update(
      id,
      { username, password: hashedPassword, photo },
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json({ id, username, photo });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  loginAdmin,
  // deleteAdmin,
};
