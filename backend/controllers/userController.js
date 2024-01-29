const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const User = require("../models/userModel");
const { error } = require("console");

const UserController = {
  signupUser: async (req, res) => {
    try {
      const new_user = req.body;

      const isEmployer = new_user.role === "employer";

      const approved = isEmployer ? false : true;

      const { password: plain_password } = new_user;
      const hashedPassword = await bcrypt.hash(plain_password, 10);

      const results = await User.create({
        ...new_user,
        password: hashedPassword,
        approved,
        color: getRandomColor(),
      });
      console.log(results);
      res.json({ success: true, data: results });
    } catch (error) {
      res.status(500).send(error.message || "Internal server error");
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email }).lean();
      if (!user) {
        throw new error();
      }

      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (!passwordsMatch) {
        throw new error();
      }

      if (!process.env.jwt_privatekey) {
        throw new error("could not sign in ");
      }
      const token = jwt.sign(
        { _id: user.id, email: user.email },
        process.env.jwt_privatekey
      );
      res.json({
        success: true,
        data: {
          token,
          name: user.username,
          role: user.role,
          _id: user._id,
          resume: user.resume,
          skills: user.skills,
          email: user.email,
          feePaid: user.feePaid,
          approved: user.approved,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "error occured trying to login " });
    }
  },
  listAll: async (req, res) => {
    try {
      const users = await User.find({
        role: { $in: ["employer", "candidate"] },
      });

      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ error: "Error occurred while fetching users" });
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const { user_id } = req.params;
      const user = await User.findById(user_id);
      if (user) {
        return res.json({ success: true, data: user });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error occurred while fetching users" });
    }
  },
  updateUserProfile: async (req, res) => {
    try {
      const { user_id } = req.params;

      const { skills, username, feePaid, filename } = req.body;

      const user = await User.findById(user_id);

      user.skills = skills;
      user.username = username;

      user.feePaid = Boolean(feePaid);
      user.color = getRandomColor();
      if (req.resume) {
        user.resume = { filename: filename, originalname: filename };
      }

      await user.save();
      if (user) {
        return res.json({ success: true, data: user });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error occurred while updating profile" });
    }
  },

  listUnapprovedApplicants: async (req, res) => {
    try {
      const unapprovedEmployers = await User.find({ approved: false });
      res.json({ success: true, data: unapprovedEmployers });
    } catch (error) {
      console.error("Error fetching unapproved employers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  approveUser: async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(401).json({ message: "Provide a valid user id" });
      }
      const newUpdatedUser = await User.findById(userId);
      newUpdatedUser.approved = true;
      await newUpdatedUser.save();

      return res.json({ success: true, data: newUpdatedUser });
    } catch (error) {
      return res
        .status(401)
        .json({ message: "a problem occurred while approving the user" });
    }
  },
  declineUser: async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(401).json({ message: "Provide a valid user id" });
      }
      const newUpdatedUser = await User.findById(userId);
      newUpdatedUser.approved = false;
      await newUpdatedUser.save();

      return res.json({ success: true, data: newUpdatedUser });
    } catch (error) {
      return res
        .status(401)
        .json({ message: "a problem occurred while approving the user" });
    }
  },
  getResume: async (req, res, next) => {
    const { resume_id } = req.params;
    const results = await User.findOne(
      { "resume._id": resume_id },
      { resume: 1, _id: 0 }
    ).lean();
    const url = path.join("./", "uploads", results.resume.filename);
    res.sendFile(path.resolve(url));
  },
};

const getRandomColor = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

module.exports = UserController;
