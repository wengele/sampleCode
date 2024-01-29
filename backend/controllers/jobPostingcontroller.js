const JobPost = require("../models/jobPostingModel");
const User = require("../models/userModel");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "wengelhulu2014@gmail.com",
    pass: "tmsx fjir fzzy qckn",
  },
});

const sendApplicationEmail = async (candidate) => {
  const mailOptions = {
    from: "wengelhulu2014@gmail.com",
    to: candidate.email,
    subject: "New Job Application",
    text: `New Job Posted check your Account`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending application email:", error);
        reject(error);
      } else {
        console.log("Application Email sent: " + info.response);
        resolve(info.response);
      }
    });
  });
};

const JobPostController = {
  getAllJobPosts: async (req, res) => {
    try {
      const { userId, searchedText = "" } = req.query;
      let jobPosts = [];
      if (userId) {
        jobPosts = await JobPost.find({ employer: userId }).populate(
          "employer",
          "username color"
        );
      } else {
        if (searchedText) {
          jobPosts = await JobPost.find({
            $text: { $search: searchedText },
          }).populate("employer", "username color");
        } else {
          jobPosts = await JobPost.find({}).populate(
            "employer",
            "username color"
          );
        }
      }
      return res.status(200).json({ success: true, data: jobPosts });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching all job posts." });
    }
  },
  createJobPost: async (req, res) => {
    try {
      const { location, title, description, userId } = req.body;
      const user = await User.findOne({ _id: userId });

      if (user.role !== "employer") {
        return res.status(401).json({
          message: "You are not allowed to create a job post",
        });
      }
      const newJobPost = await JobPost.create({
        location,
        title,
        description,
        employer: user,
      });

      const candidates = await User.find({ role: "candidate" }).populate(
        "role",
        "email"
      );

      if (candidates.length === 0) {
        console.log("No candidates found");
      } else {
        for (const candidate of candidates) {
          if (candidate.email) {
            await sendApplicationEmail(candidate);
          } else {
            console.log(`Candidate with _id ${candidate._id} has no email`);
          }
        }
        console.log("Job application emails sent successfully");
      }
      return res
        .status(201)
        .json({ message: "Job post created successfully", data: newJobPost });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  getJobPost: async (req, res) => {
    try {
      const jobId = req.params.job_id;
      const jobPost = await JobPost.findById(jobId).populate(
        "employer",
        "username"
      );
      if (jobPost) {
        res.status(200).json(jobPost);
      } else {
        res.status(404).json({ error: "Job post not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the job post." });
    }
  },
  editJobPost: async (req, res) => {
    try {
      const jobId = req.params.job_id;
      const { location, title, description } = req.body;

      const updatedJobPost = await JobPost.findByIdAndUpdate(
        jobId,
        { location, title, description },
        { new: true }
      );

      if (updatedJobPost) {
        res.status(200).json(updatedJobPost);
      } else {
        res.status(404).json({ error: "Job post not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the job post." });
    }
  },
  deleteJobPost: async (req, res) => {
    try {
      const jobId = req.params.job_id;
      const jobPost = await JobPost.deleteOne({ _id: jobId });
      console.log({ jobPost });
      if (jobPost) {
        res
          .status(200)
          .json({ message: `Job Posting was deleted successfully` });
      } else {
        res.status(404).json({ error: "Job post not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the job post." });
    }
  },
};

module.exports = JobPostController;
