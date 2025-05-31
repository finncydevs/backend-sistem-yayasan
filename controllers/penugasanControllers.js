const Penugasan = require("../models/Penugasan");

// Utility function for error responses
const errorResponse = (res, status, message) => {
  return res.status(status).json({ success: false, error: message });
};

const successResponse = (res, status, data = {}, message = "") => {
  return res.status(status).json({ success: true, data, message });
};

const getPenugasans = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const results = await new Promise((resolve, reject) => {
      Penugasan.getAll(offset, limit, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    successResponse(res, 200, results);
  } catch (err) {
    errorResponse(res, 500, "Failed to fetch penugasan data");
  }
};

const getPenugasanById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return errorResponse(res, 400, "Invalid ID format");
    }

    const result = await new Promise((resolve, reject) => {
      Penugasan.getById(id, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    if (!result || result.length === 0) {
      return errorResponse(res, 404, "Penugasan not found");
    }

    successResponse(res, 200, result[0]);
  } catch (err) {
    errorResponse(res, 500, "Failed to fetch penugasan");
  }
};

const createPenugasan = async (req, res) => {
  try {
    const { id_nomor_surat, id_pegawai, id_satuan_pendidikan } = req.body;

    if (!id_nomor_surat || !id_pegawai || !id_satuan_pendidikan) {
      return errorResponse(res, 400, "Missing required fields");
    }

    const result = await new Promise((resolve, reject) => {
      Penugasan.create(req.body, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    successResponse(
      res,
      201,
      { id: result.insertId, ...req.body },
      "Penugasan created successfully"
    );
  } catch (err) {
    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return errorResponse(res, 400, "Invalid reference ID");
    }
    errorResponse(res, 500, "Failed to create penugasan");
  }
};

const updatePenugasan = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id || isNaN(id)) {
      return errorResponse(res, 400, "Invalid ID format");
    }

    if (
      !data.id_nomor_surat ||
      !data.id_pegawai ||
      !data.id_satuan_pendidikan
    ) {
      return errorResponse(res, 400, "Missing required fields");
    }

    const result = await new Promise((resolve, reject) => {
      Penugasan.update(id, data, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    if (result.affectedRows === 0) {
      return errorResponse(res, 404, "Penugasan not found");
    }

    successResponse(
      res,
      200,
      { id, ...data },
      "Penugasan updated successfully"
    );
  } catch (err) {
    errorResponse(res, 500, "Failed to update penugasan");
  }
};

const deletePenugasan = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return errorResponse(res, 400, "Invalid ID format");
    }

    const result = await new Promise((resolve, reject) => {
      Penugasan.delete(id, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    if (result.affectedRows === 0) {
      return errorResponse(res, 404, "Penugasan not found");
    }

    successResponse(res, 200, { id }, "Penugasan deleted successfully");
  } catch (err) {
    errorResponse(res, 500, "Failed to delete penugasan");
  }
};

module.exports = {
  getPenugasans,
  getPenugasanById,
  createPenugasan,
  updatePenugasan,
  deletePenugasan,
};
