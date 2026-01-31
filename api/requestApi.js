const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Request = require("../models/requestModel");


router.post("/training/create", auth, async (req, res) => {
  const trainingName = req.body.trainingName;
  const description = req.body.description;
  const trainer = req.body.trainer;

  if (!trainingName || !description || !trainer) {
    return res.json({ message: "please send all the details" });
  }

  const request = Request({
    trainingName: trainingName,
    description: description,
    status: "AVAILABLE",
    trainer: trainer,
    createdBy: req.user
  });

  await request.save();
  return res.json({ message: "training created successfully" });
});


router.get("/training/my-trainings", auth, async (req, res) => {
  const request = await Request.find({ createdBy: req.user });
  res.json({ trainings: request });
});

module.exports = router;
