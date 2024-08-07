const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    console.error("Error in auth middleware:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
