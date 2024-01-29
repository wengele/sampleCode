const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();
const multer = require("multer");
const auth = require("../authMiddleware");

const isAdmin = (req, res, next) => {
  if (res.locals.isAdmin) {
    next();
  } else {
    res
      .status(403)
      .json({ error: "Only admin users can perform this action." });
  }
};
router.get("/", auth.authToken, isAdmin, UserController.listAll);
router.get("/profile/:user_id", auth.authToken, UserController.getUserProfile);
router.put(
  "/profile/:user_id",
  multer({ dest: "uploads/" }).single("resume"),
  auth.authToken,
  UserController.updateUserProfile
);
router.get("/resume/:resume_id", auth.authToken, UserController.getResume);
router.post("/signup", UserController.signupUser);
router.post("/signin", UserController.loginUser);
router.post("/approve", auth.authToken, isAdmin, UserController.approveUser);
router.post("/decline", auth.authToken, isAdmin, UserController.declineUser);
router.get(
  "/unapproved",
  auth.authToken,
  isAdmin,
  UserController.listUnapprovedApplicants
);

module.exports = router;
