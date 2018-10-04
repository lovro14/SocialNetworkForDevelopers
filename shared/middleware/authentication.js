import jwt from "jsonwebtoken";

export const generateToken = (req, res, next) => {
  const payload = {
    name: req.user.name,
    _id: req.user._id,
    publicId: req.user.publicId,
  };
  const options = {
    expiresIn: "1h"
  };
  req.createdToken = jwt.sign(payload, process.env.AUTH_SECRET, options);
  return next();
};

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.authData = jwt.verify(bearerToken, process.env.AUTH_SECRET);
    return next();
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};
