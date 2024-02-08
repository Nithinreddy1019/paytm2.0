const jwt = require("jsonwebtoken");
const { JWT_PASS } = require("../config");


const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(403).json({ message: "unauthorized" });
  };

  const token = authHeader.split(' ')[1];
  try {
    const decoded = await jwt.verify(token, JWT_PASS);
    req.username = decoded.username;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized" });
  }
}


module.exports = authMiddleware;
