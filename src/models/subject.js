const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: function(v) {
        return this.teacherRole(v, 'teacher');
      },
      message: 'Teacher is not a valid teacher user.'
    }
  },
  students: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: function(v) {
          return this.parent().studentRole(v, 'student');
        },
        message: 'Student is not a valid student user.'
      }
    },
    marks: {
      type: Number,
      default: null
    },
    reclamation: {
      type: String,
      default: null
    }
  }]
});
subjectSchema.methods.teacherRole = async function(userId, role) {
    const user = await mongoose.model('User').findById(userId);
    return user && user.role === role;
  };
subjectSchema.methods.studentRole = async function(userId, role) {
    const user = await mongoose.model('User').findById(userId);
    return user && user.role === role;
};
module.exports = mongoose.model('Subject', subjectSchema);