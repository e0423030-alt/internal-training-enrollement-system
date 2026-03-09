const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  training: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
    required: true
  },
  status: {
    type: String,
    default: "ENROLLED"
  },
  enrolledOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);