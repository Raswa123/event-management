import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventname: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },

});

export default mongoose.models.events ||
  mongoose.model("events", eventSchema);