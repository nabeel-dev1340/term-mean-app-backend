const mongoose = require("../db/connection");

const departmentHeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  contact: {
    type: String,
  },
});

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 128,
    unique: true,
  },
  departmentHead: {
    type: departmentHeadSchema,
    required: true,
  },
  complaintsClosed: {
    type: Number,
    default: 0,
  },
  complaintsPending: {
    type: Number,
    default: 0,
  },
  subDepartments: [
    {
      type: String,
    },
  ],
});

const Department = mongoose.model("Department", departmentSchema);

exports.Department = Department;
