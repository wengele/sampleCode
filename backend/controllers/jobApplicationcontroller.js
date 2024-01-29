const JobApplications = require("../models/jobApplication");
const JobPost = require("../models/jobPostingModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "wengelhulu2014@gmail.com",
    pass: "tmsx fjir fzzy qckn",
  },
});

const sendApplicationEmail = async (job) => {
  const mailOptions = {
    from: "wengelhulu2014@gmail.com",
    to: job.employer.email,
    subject: "New Job Application",
    text: `You have a new application for this job: ${job.title}`,
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

const ApplicationController = {
  applyForJob: async (req, res) => {
    try {
      const { user_id } = req.body;
      const jobId = req.params.job_id;
      console.log(user_id, jobId);

      const newApplication = await JobApplications.create({
        job: jobId,
        candidate: user_id,
      });
      const [job] = await JobPost.find({ _id: jobId }).populate(
        "employer",
        "email"
      );

      await sendApplicationEmail(job);
      res.status(201).json({
        message: "Application submitted successfully",
        data: newApplication,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while applying for the job." });
    }
  },

  checkIfApplied: async (req, res) => {
    try {
      const jobId = req.params.job_id;
      const candidate_id = req.params.candidate_id;
      const result = await JobApplications.find({
        job: jobId,
        candidate: candidate_id,
      });
      let payload = { isAlreadyApplied: false };
      if (result.length > 0) {
        payload = { isAlreadyApplied: true };
        return res.status(200).json({ success: true, data: payload });
      }
      res.status(200).json({ success: true, data: payload });
    } catch (error) {
      res.status(500).json({
        error: "already applied",
      });
    }
  },
  getAllApplicationsForJob: async (req, res) => {
    try {
      const jobId = req.params.job_id;
      const { q } = req.query;
      let applications = [];

      if (q) {
        applications = await JobApplications.find({
          job: jobId,
          status: "pending",
        }).populate({
          path: "candidate",
          select: "username resume skills",
          match: { skills: { $regex: q, $options: "i" } },
        });
      } else {
        applications = await JobApplications.find({
          job: jobId,
          status: "pending",
        }).populate({
          path: "candidate",
          select: "username resume skills",
        });
      }

      const lastRes = applications.filter((item) => item.candidate !== null);

      res.status(200).json({ success: true, data: lastRes });
    } catch (error) {
      console.log({ error });
      res.status(500).json({
        error: "An error occurred while fetching applications for the job.",
      });
    }
  },
  getAllApplicationsForCandidate: async (req, res) => {
    try {
      const candidate_id = req.params.candidate_id;
      const applications = await JobApplications.find({
        candidate: candidate_id,
      }).populate("job", "title description employer");

      res.status(200).json({ success: true, data: applications });
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while fetching applications for the job.",
      });
    }
  },
  acceptApplication: async (req, res) => {
    try {
      const { job_id, application_id } = req.params;
      console.log(job_id, application_id);
      const application = await JobApplications.findById(application_id);
      if (application) {
        application.status = "accepted";
        await application.save();

        return res.status(200).json({ success: true, data: application });
      }
    } catch (error) {
      console.log({ error });
      return res.status(500).json({
        error: "An error occurred while accepting the application",
      });
    }
  },
  rejectApplication: async (req, res) => {
    try {
      const { job_id, application_id } = req.params;
      console.log(job_id, application_id);
      const application = await JobApplications.findById(application_id);
      if (application) {
        application.status = "rejected";

        await application.save();

        return res.status(200).json({ success: true, data: application });
      }
    } catch (error) {
      console.log({ error });
      return res.status(500).json({
        error: "An error occurred while rejecting the application",
      });
    }
  },

  getApplication: async (req, res) => {
    try {
      const applicationId = req.params.applicationId;
      const application = await JobApplications.findById(applicationId);

      if (!application) {
        return res.status(404).json({ error: "Application not found." });
      }

      res.status(200).json({ data: application });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the application." });
    }
  },
};

module.exports = ApplicationController;
