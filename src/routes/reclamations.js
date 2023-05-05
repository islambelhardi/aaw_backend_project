const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const reclamationController = require('../controllers/reclamationsController');

router.post('/:subjectId/reclamations', auth, reclamationController.createReclamation);

module.exports = router;