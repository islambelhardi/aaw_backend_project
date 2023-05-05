const Reclamation = require('../models/reclamation');
const Subject = require('../models/subject');


const createReclamation = async (req, res) => {
    // const userId = await req.user.Id;
    // console.log('userid '+ req.user.id);
  try {
    const subject = await Subject.findById(req.params.subjectId);
    console.log('subject '+ subject._id);
    console.log('user '+ req.user._id);
    console.log('message '+ req.body.message);
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

module.exports = {
  createReclamation
};