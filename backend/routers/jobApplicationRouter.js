const express = require("express");
const router = express.Router();
const jobApplicationController = require("../controllers/jobApplicationcontroller");
const auth = require("../authMiddleware");

const isEmployer = (req, res, next) => {
  if (res.locals.isEmployer) {
    next();
  } else {
    res.status(403).json({ error: "Only employers can perform this action." });
  }
};

router.post(
  "/:job_id/apply",
  auth.authToken,
  jobApplicationController.applyForJob
);
router.get(
  "/:candidate_id",
  auth.authToken,
  jobApplicationController.getAllApplicationsForCandidate
);
router.get(
  "/:job_id/applications",
  auth.authToken,
  isEmployer,
  jobApplicationController.getAllApplicationsForJob
);
router.get(
  "/:application_id",
  auth.authToken,
  jobApplicationController.getApplication
);
router.get(
  "/:job_id/applications/:application_id/accept",
  auth.authToken,
  isEmployer,
  jobApplicationController.acceptApplication
);
router.get(
  "/:job_id/applications/:application_id/reject",
  auth.authToken,
  isEmployer,
  jobApplicationController.rejectApplication
);
router.get(
  "/:job_id/checkIfApplied/:candidate_id",
  auth.authToken,
  jobApplicationController.checkIfApplied
);

module.exports = router;
