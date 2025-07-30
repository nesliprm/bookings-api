import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  if (!token) {
    return res
      .status(401)
      .json({ message: "You cannot access this operation without a token!" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token provided!" });
    }

    req.account = decoded;
    next();
  });
};

export default authMiddleware;
