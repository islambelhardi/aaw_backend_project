const Subject = require('../models/subject');

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

module.exports = { getAllSubjects, createSubject, getSubjectById, updateSubjectById, deleteSubjectById };