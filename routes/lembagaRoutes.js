const express = require("express");
const router = express.Router();
const lembagaController = require("../controllers/lembagaControllers");

router.get("/", lembagaController.getLembagas);
router.get("/:id", lembagaController.getLembagaById);
router.post("/", lembagaController.createLembaga);
router.put("/:id", lembagaController.updateLembaga);

module.exports = router;
