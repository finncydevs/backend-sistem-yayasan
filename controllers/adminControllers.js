  const Admin = require("../models/Admin.js");
  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcrypt");
  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
  }

  // Helper: Generate JWT token
  const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });
  };


  // Create new admin
  const createAdmin = async (req, res) => {
    try {
      const { username, email, password, photo = null } = req.body;

      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ error: "Username, email, and password are required" });
      }

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
          { username, email, password: hashedPassword, photo },
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });

      const token = generateToken(result.insertId);
      res
        .status(201)
        .json({ id: result.insertId, username, email, photo, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // Login admin
  const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    Admin.getByUsername(username, async (err, admin) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!admin) return res.status(404).json({ error: "Admin not found" });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

      const token = generateToken(admin.id);
      res.json({
        id: admin.id,
        email: admin.email,
        username: admin.username,
        token,
      });
    });
  };

  // Upload admin photo
  const uploadFotoAdmin = async (req, res) => {
    try {
      const id = req.params.id;
      const filePath = `/uploads/admin/${req.file.filename}`;

      Admin.uploadFoto(id, filePath, (err, result) => {
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
  

  // Get all admins
  const getAdmins = async (req, res) => {
    Admin.getAll((err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(results);
    });
  };

  // Get admin by ID
  const getAdminById = async (req, res) => {
    Admin.getById(req.params.id, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(result[0]);
    });
  };

  // Update admin
  const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, photo = null } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    try {
      const updatedData = { username, email, photo };

      if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
      }

      Admin.update(id, updatedData, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json({ id, username, email, photo });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };

  // Delete admin (optional)
  const deleteAdmin = (req, res) => {
    const { id } = req.params;

    Admin.delete(id, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Admin deleted successfully" });
    });
  };

  const getMe = async (req, res) => {
    if (!req.admin) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(req.admin);
  };

  // Change password
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  const { id } = req.params

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: "Old and new password are required" })
  }

  Admin.getById(id, async (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: "Internal server error" })
    }

    const admin = results[0]

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" })
    }

    const isMatch = await bcrypt.compare(oldPassword, admin.password)
    if (!isMatch) {
      return res.status(401).json({ error: "Old password is incorrect" })
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    Admin.updatePassword(id, hashedNewPassword, (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: "Failed to update password" })
      }

      res.json({ message: "Password updated successfully" })
    })
  })
}


  module.exports = {
    getAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    loginAdmin,
    getMe,
    uploadFotoAdmin,
    deleteAdmin,
    changePassword
  };
