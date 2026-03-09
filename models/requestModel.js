const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  trainingName: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  seatLimit: {
    type: Number,
    required: true
  },

  enrolledCount: {
    type: Number,
    default: 0
  },

  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  createdOn: {
    type: Date,
    default: Date.now
  }
},{
  timestamps: true
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;