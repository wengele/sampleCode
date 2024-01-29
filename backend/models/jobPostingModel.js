const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },

  location: { type: String, required: true },
});

jobPostSchema.index({ title: "text", description: "text", location: "text" });

const JobPost = mongoose.model("JobPost", jobPostSchema);
module.exports = JobPost;
