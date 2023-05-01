const express = require('express');
const auth = require('../middlewares/auth');
const subjectController = require('../controllers/subjectController');
const router = express.Router();

// // GET all subjects
// router.get('/', auth(), async (req, res) => {
//   try {
//     // Add code to retrieve all subjects from database
    
//     res.status(200).json({ message: 'Subjects retrieved successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Unable to retrieve subjects.' });
//   }
// });

// // POST a new subject
// router.post('/', auth('admin'), async (req, res) => {
//   try {
//     // Add code to create a new subject in the database
//     res.status(201).json({ message: 'Subject created successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Unable to create subject.' });
//   }
// });

// // PUT update an existing subject
// router.put('/:id', auth('admin'), async (req, res) => {
//   try {
//     // Add code to update the specified subject in the database
//     res.status(200).json({ message: 'Subject updated successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Unable to update subject.' });
//   }
// });

// // DELETE an existing subject
// router.delete('/:id', auth('admin'), async (req, res) => {
//   try {
//     // Add code to delete the specified subject from the database
//     res.status(200).json({ message: 'Subject deleted successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Unable to delete subject.' });
//   }
// });
// define routes for subjects
router.get('/', subjectController.getAllSubjects);
router.post('/', subjectController.createSubject);
router.put('/:id', subjectController.updateSubjectById);
router.delete('/:id', subjectController.deleteSubjectById);
module.exports = router;