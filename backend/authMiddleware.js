const jwt = require("jsonwebtoken");
const User = require("./models/userModel");

const authToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    jwt.verify(token, process.env.jwt_privatekey, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      req.userId = decoded.userId;
      const [user] = await User.find({ email: decoded.email });
      res.locals.isAdmin = user.role === "admin";
      res.locals.isEmployer = user.role === "employer";

      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { authToken };
