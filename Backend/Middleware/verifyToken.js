const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check header format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    // Token is valid, continue to the next middleware/route
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token!" });
  }
};

module.exports = verifyToken;
