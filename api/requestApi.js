const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Request = require("../models/requestModel");
const Enrollment = require("../models/enrollmentmodel");


// ===============================
// 1️⃣ TRAINER - CREATE TRAINING
// ===============================
router.post("/training/create", auth, async (req, res) => {
  try {
    if (req.user.role !== "TRAINER") {
      return res.status(403).json({ message: "Only trainers can create training" });
    }

    const { trainingName, description, seatLimit } = req.body;

    if (!trainingName || !description || !seatLimit) {
      return res.json({ message: "Please send all details" });
    }

    const training = new Request({
      trainingName,
      description,
      seatLimit,
      enrolledCount: 0,
      status: "AVAILABLE",
      trainer: req.user._id,
      createdBy: req.user._id
    });

    await training.save();

    res.json({ message: "Training created successfully", training });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ===============================
// 2️⃣ TRAINER - VIEW MY TRAININGS
// ===============================
router.get("/training/my-trainings", auth, async (req, res) => {
  try {
    if (req.user.role !== "TRAINER") {
      return res.status(403).json({ message: "Access denied" });
    }

    const trainings = await Request.find({ trainer: req.user._id });
    res.json({ trainings });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ===============================
// 3️⃣ EMPLOYEE - VIEW ALL TRAININGS
// ===============================
router.get("/training/all", auth, async (req, res) => {
  try {
    if (req.user.role !== "EMPLOYEE") {
      return res.status(403).json({ message: "Access denied" });
    }

    const trainings = await Request.find();
    res.json({ trainings });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ===============================
// 4️⃣ EMPLOYEE - ENROLL IN TRAINING
// ===============================
router.post("/training/enroll/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "EMPLOYEE") {
      return res.status(403).json({ message: "Only employees can enroll" });
    }

    const training = await Request.findById(req.params.id);

    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    // 🔥 CRITICAL BUSINESS RULE
    if (training.enrolledCount >= training.seatLimit) {
      return res.status(400).json({ message: "Seats are full" });
    }

    // Check if already enrolled
    const alreadyEnrolled = await Enrollment.findOne({
      employee: req.user._id,
      training: training._id
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    // Create enrollment
    const enrollment = new Enrollment({
      employee: req.user._id,
      training: training._id,
      status: "ENROLLED"
    });

    await enrollment.save();

    // Increase count
    training.enrolledCount += 1;
    await training.save();

    res.json({ message: "Enrollment successful" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ===============================
// 5️⃣ EMPLOYEE - VIEW MY ENROLLMENTS
// ===============================
router.get("/training/my-enrollments", auth, async (req, res) => {
  try {
    if (req.user.role !== "EMPLOYEE") {
      return res.status(403).json({ message: "Access denied" });
    }

    const enrollments = await Enrollment.find({ employee: req.user._id })
      .populate("training");

    res.json({ enrollments });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;