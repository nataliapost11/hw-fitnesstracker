const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  type: {
    type: String,
    trim: true,
    required: "Enter a type of the exercise"
  },
  name: {
    type: String,
    trim: true,
    required: "Enter a name of the exercise"
  },
  duration: {
    type: Number,
    required: "Enter the duration in minutes"
  },
  distance: {
    type: Number,
    required: "Enter the distance"
  },
  weight: {
    type: Number,
    required: "Enter the weight in pounds"
  },
  reps: {
    type: Number,
    required: "Enter the reps"
  },
  sets: {
    type: Number,
    required: "Enter the sets"
  }
});

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [exerciseSchema]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = { Workout };
