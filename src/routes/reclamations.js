const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const reclamationController = require('../controllers/reclamationsController');

router.post('/:subjectId', auth, reclamationController.createReclamation);
router.patch('/:reclamationId', auth, reclamationController.updateReclamation);
module.exports = router;