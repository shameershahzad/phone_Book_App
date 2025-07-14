const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check header format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // remove "Bearer "

  try {
    const decoded = jwt.verify(token, "Your Secret Key");// usually it contain user_id not all data
    req.userId = decoded.id;
    next(); // This means everything is okay — go to the next step (like adding contact). 
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token!" });
  }
};

module.exports = verifyToken;
