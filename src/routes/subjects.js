const express = require('express');
const auth = require('../middlewares/auth');
const subjectController = require('../controllers/subjectController');
const router = express.Router();

// define routes for subjects
router.get('/', subjectController.getAllSubjects);
router.get('/students', subjectController.getAllStudentsBySubject);
router.post('/', subjectController.createSubject);
router.get('/:id',subjectController.getSubjectById);
router.get('/teacher/:teacherId', subjectController.getSubjectsByTeacher);
router.put('/:id', subjectController.updateSubjectById);
router.delete('/:id', subjectController.deleteSubjectById);
router.patch('/:id/student/:studentId/mark',auth, subjectController.updateStudentMarks);
router.get('/students/:studentId/marks', subjectController.getMarksForStudent);

module.exports = router;