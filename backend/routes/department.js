const { Department } = require("../models/department");
const mongoose = require("../db/connection");
const express = require("express");
const { isLoggedIn } = require("../middleware/auth");

const router = express.Router();

// Fetch All Departments
router.get("/", isLoggedIn,async (req, res) => {
  let departments = await Department.find();
  res.status(200).send(departments);
});

// Fetch Department by id
router.get("/:id", isLoggedIn,async (req, res) => {
  let id = req.params.id;
  let department = await Department.findOne({ id });
  res.status(200).send(department);
});

// Create new Department
router.post("/", isLoggedIn,async (req, res) => {
  let department = new Department({
    departmentName: req.body.departmentName,
    departmentHead: req.body.departmentHead,
    complaintsClosed: req.body.complaintsClosed,
    complaintsPending: req.body.complaintsPending,
    subDepartments: req.body.subDepartments,
  });

  try {
    const departmentCreated = department.save();
    res.status(200).json(departmentCreated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a Department
router.put("/:id", isLoggedIn,async (req, res) => {
  let id = req.params.id;
  let newVals = new Department({
    departmentName: req.body.departmentName,
    departmentHead: req.body.departmentHead,
    complaintsClosed: req.body.complaintsClosed,
    complaintsPending: req.body.complaintsPending,
    subDepartments: req.body.subDepartments,
  });

  let department = await Department.updateOne({ id }, newVals);
  res.status(200).send(department);
});

// Delete a Department
router.delete("/:id", isLoggedIn,async (req, res) => {
  let id = req.params.id;
  let department = await Department.remove({ id });
  res.status(200).send(department);
});

module.exports = router;
