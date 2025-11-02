const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    department: {
      type: String,
      required: true
    },
    studentId: {
      type: String,
      required: true,
      unique: true
    },
    age: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
