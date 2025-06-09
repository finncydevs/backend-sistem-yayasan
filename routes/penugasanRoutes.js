const route = require("express").Router();
const {
  getPenugasans,
  getPenugasanById,
  createPenugasan,
  updatePenugasan,
  deletePenugasan,
} = require("../controllers/penugasanControllers");
const { protect } = require("../middleware/auth");

route.get("/", protect, getPenugasans);
route.post("/", protect, createPenugasan);
route.get("/:id", protect, getPenugasanById);
route.put("/:id", protect, updatePenugasan);
route.delete("/:id", protect, deletePenugasan);
module.exports = route;