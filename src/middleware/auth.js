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
  console.log("Authorization header:", req.headers.authorization);
  console.log("Token after split:", token);
  console.log("Secret used:", secretKey);
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token provided!" });
    }

    req.user = decoded;
    next();
  });
};

export default authMiddleware;
