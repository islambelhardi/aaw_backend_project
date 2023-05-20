const Subject = require('../models/subject');
const User = require('../models/user');
const mongoose = require('mongoose');
// Get all subjects
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.send(subjects);
  } catch (e) {
    res.status(500).send({ error: 'Something went wrong.' });
  }
};

// Create a new subject
const createSubject = async (req, res) => {
  const subject = new Subject(req.body);
  try {
    await subject.save();
    res.status(201).send(subject);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: 'Invalid data.' });
  }
};

// Get a subject by ID
const getSubjectById = async (req, res) => {
  console.log(req.params.id);
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).send({ error: 'Subject not found.' });
    }

    res.send(subject);
  } catch (e) {
    res.status(500).send({ error: 'Something went wrong.' });
  }
};

// Update a subject by ID
const updateSubjectById = async (req, res) => {
  const updates = Object.keys(req.body);
  console.log(updates);
  const allowedUpdates = ['name', 'description', 'teacher'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates.' });
  }

  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).send({ error: 'Subject not found.' });
    }

    updates.forEach((update) => (subject[update] = req.body[update]));
    await subject.save();

    res.send(subject);
  } catch (e) {
    res.status(400).send({ error: 'Invalid data.' });
  }
};

// Delete a subject by ID
const deleteSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
      return res.status(404).send({ error: 'Subject not found.' });
    }

    res.send(subject);
  } catch (e) {
    res.status(500).send({ error: 'Something went wrong.' });
  }
};

const updateStudentMarks = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    const studentId = req.params.studentId;
    const student = subject.findStudentById(studentId);
    console.log(req.body.marks);
    console.log(student.marks);
    console.log(subject);
    if (!subject) {
      return res.status(404).send({ error: 'Subject not found.' });
    }

    if (!student) {
      return res.status(404).send({ error: 'Student not found.' });
    }

    if (!subject.teacherRole(req.user._id)) {
      return res.status(401).send({ error: 'You are not authorized to update this student marks.' });
    }

    student.marks = req.body.marks;
    // console.log(student.marks);
    await subject.save();

    res.send(subject);
  } catch (e) {
    res.status(400).send({ error: 'Invalid data.' });
  }
};
async function getMarksForStudent(req, res) {
  const studentId = req.params.studentId; // Assuming the student ID is passed as a URL parameter
  console.log(studentId);
  try {
    const subjects = await Subject.aggregate([
      {
        $unwind: '$students'
      },
      {
        $match: {
          'students.student': new mongoose.Types.ObjectId(studentId)
        }
      },
      {
        $group: {
          _id: '$_id',
          subject: { $first: '$name' },
          marks: {
            $push: '$students.marks'
          }
        }
      }
    ]);

    res.json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while retrieving marks.' });
  }
}

async function getAllStudentsBySubject(req, res) {
  try {
    const students = await User.find({ role: 'student' }); // Assuming 'User' model represents the users in your system
    
    const studentData = [];

    for (const student of students) {
      const marks = await Subject.aggregate([
        {
          $unwind: '$students'
        },
        {
          $match: {
            'students.student': new mongoose.Types.ObjectId(student._id)
          }
        },
        {
          $group: {
            _id: '$_id',
            subject: { $first: '$name' },
            marks: { $push: '$students.marks' }
          }
        }
      ]);

      studentData.push({
        student: student.firstName+' '+student.lastName,
        marks
      });
    }

    res.json(studentData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while retrieving student data.' });
  }
}
module.exports = { getAllSubjects, createSubject, getAllStudentsBySubject, getSubjectById, getMarksForStudent, updateSubjectById, deleteSubjectById, updateStudentMarks };