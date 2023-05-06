const Reclamation = require('../models/reclamation');
const Subject = require('../models/subject');


const createReclamation = async (req, res) => {
  // const userId = await req.user.Id;
  // console.log('userid '+ req.user.id);
  try {
    const subject = await Subject.findById(req.params.subjectId);
    console.log('subject ' + subject._id);
    console.log('user ' + req.user._id);
    console.log('message ' + req.body.message);
    if (!subject) {
      return res.status(404).send({ error: 'Subject not found.' });
    }

    const reclamation = new Reclamation({
      student: req.user._id,
      subject: subject._id,
      message: req.body.message
    });

    await reclamation.save();

    res.status(201).send(reclamation);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: 'Invalid data.' });
  }
};
const updateReclamation = async (req, res) => {
  try {
    const reclamation = await Reclamation.findById(req.params.reclamationId);
    const subject = await Subject.findById(reclamation.subject);
    if (!reclamation) {
      return res.status(404).send({ error: 'Reclamation not found.' });
    }
    if (!subject) {
      return res.status(404).send({ error: 'Subject not found.' });
    }
    // Check that the current user is a teacher and is the teacher for this subject
    console.log('user ' + req.user._id);
    console.log('subject ' + subject.teacher);
    console.log('The teacher is the subject teacher '+ req.user._id != subject.teacher);
    if (req.user.role !== 'teacher' && req.user._id != subject.teacher) {
      return res.status(401).send({ error: 'You are not authorized to update this reclamation.' });
    }

    // Update the status of the reclamation
    reclamation.status = req.body.status;
    await reclamation.save();

    res.send(reclamation);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: 'Invalid data.' });
  }
};
module.exports = { createReclamation, updateReclamation };