const route = require("express").Router();
const {
  getPenugasans,
  getPenugasanById,
  createPenugasan,
  updatePenugasan,
  deletePenugasan,
} = require("../controllers/penugasanControllers");

route.get("/", getPenugasans);
route.post("/", createPenugasan);
route.get("/:id", getPenugasanById);
route.put("/:id", updatePenugasan);
route.delete("/:id", deletePenugasan);
module.exports = route;