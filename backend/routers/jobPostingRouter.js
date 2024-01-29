const express = require("express");
const JobPostController = require("../controllers/jobPostingcontroller");
const auth = require("../authMiddleware");

const router = express.Router();

router.get("/", JobPostController.getAllJobPosts);
router.post("/", auth.authToken, JobPostController.createJobPost);
router.get("/:job_id", JobPostController.getJobPost);
router.put("/:job_id", auth.authToken, JobPostController.editJobPost);
router.delete("/:job_id", auth.authToken, JobPostController.deleteJobPost);
module.exports = router;
