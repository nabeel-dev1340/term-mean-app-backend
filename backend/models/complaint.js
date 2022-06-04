const mongoose = require("../db/connection");

const complaintAssigneeSchema = new mongoose.Schema({
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

const complaintSchema = new mongoose.Schema({
  complaintByUserEmail: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  complaintDepartment: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 128,
  },
  complaintSubDepartment: {
    type: String,
  },
  complaintDate: {
    type: Date,
    default: Date.now,
  },
  complaintDetails: {
    type: String,
    required: true,
  },
  complaintStatus: {
    type: String,
    enum: ["Inprogress", "pending", "closed"],
  },
  complaintOutcome: {
    type: String,
    enum: ["relief granted", "relief not granted", "partial relief granted"],
  },
  complaintAssignee: {
    type: complaintAssigneeSchema,
    required: true,
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);
exports.Complaint = Complaint;
