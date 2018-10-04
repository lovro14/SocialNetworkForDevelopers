import fs from "fs";
import path from "path";

export const createUserFolder = (req, res, next) => {
  let targetPath = path.resolve(`./public/upload/${req.user.publicId}`);
  try {
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath);
    }

    targetPath = path.resolve(
      `./public/upload/${req.user.publicId}/profilePictures`
    );
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};
