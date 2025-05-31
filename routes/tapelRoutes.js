const express = require('express');
const router = express.Router();
const {
  getAllTapel,
  createTapel,
  updateTapel,
  getById
} = require('../controllers/tapelControllers');

router.get('/', getAllTapel);
router.post('/', createTapel);
router.get('/:id', getById)
router.put('/:id', updateTapel);

module.exports = router;