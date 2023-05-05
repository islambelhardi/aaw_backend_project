const express = require('express');
const auth = require('../middlewares/auth');
const subjectController = require('../controllers/subjectController');
const router = express.Router();

// define routes for subjects
router.get('/', subjectController.getAllSubjects);
router.post('/', subjectController.createSubject);
router.get('/:id',subjectController.getSubjectById);
router.put('/:id', subjectController.updateSubjectById);
router.delete('/:id', subjectController.deleteSubjectById);

module.exports = router;