const { Complaint } = require("../models/complaint");
const mongoose = require("../db/connection");
const express = require("express");
const { isLoggedIn } = require("../middleware/auth");

const router = express.Router();

// Fetch All complaints
router.get("/", isLoggedIn, async (req, res) => {
  let complaints = await Complaint.find();
  res.status(200).send(complaints);
});

// Fetch Complaint by id
router.get("/:id", isLoggedIn, async (req, res) => {
  let id = req.params.id;
  let complaint = await Complaint.findOne({ id });
  res.status(200).send(complaint);
});

// Create new Complaint
router.post("/", isLoggedIn, async (req, res) => {
  let complaint = new Complaint({
    complaintByUserEmail: req.body.complaintByUserEmail,
    complaintDepartment: req.body.complaintDepartment,
    complaintSubDepartment: req.body.complaintSubDepartment,
    complaintDate: req.body.complaintDate,
    complaintDetails: req.body.complaintDetails,
    complaintStatus: req.body.complaintStatus,
    complaintOutcome: req.body.complaintOutcome,
    complaintAssignee: req.body.complaintAssignee,
  });

  let dbResponse = await complaint.save();

  res.status(201).send(dbResponse);
});

// Update a Complaint
router.put("/:id", isLoggedIn, async (req, res) => {
  let id = req.params.id;
  let newVals = new Complaint({
    complaintByUserEmail: req.body.complaintByUserEmail,
    complaintDepartment: req.body.complaintDepartment,
    complaintSubDepartment: req.body.complaintSubDepartment,
    complaintDate: req.body.complaintDate,
    complaintDetails: req.body.complaintDetails,
    complaintStatus: req.body.complaintStatus,
    complaintOutcome: req.body.complaintOutcome,
    complaintAssignee: req.body.complaintAssignee,
  });

  let complaint = await Complaint.updateOne({ id }, newVals);
  res.status(200).send(complaint);
});

// Delete a Complaint
router.delete("/:id", isLoggedIn, async (req, res) => {
  let id = req.params.id;
  let complaint = await Complaint.delete({ id });
  res.status(200).send(complaint);
});

module.exports = router;
