import fs from "fs";
import path from "path";
import uuid from "uuid";
import Promise from "bluebird";

Promise.promisifyAll(fs);

export async function upload(req, res, next) {
  const image = req.file;
  const tempPath = image.path;
  const ext = path.extname(image.originalname).toLocaleLowerCase();
  if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
    try {
      const timeGenerateName = uuid.v1();
      const imageName = `${timeGenerateName}${ext}`;
      const targetPath = path.resolve(
        `./public/upload/${req.authData.publicId}/profilePictures/${imageName}`
      );
      await fs.renameAsync(tempPath, targetPath);
      req.uploadedProfilePicture = targetPath.substring(
        targetPath.indexOf("/public"),
        targetPath.length
      );
    } catch (err) {
      return next(err);
    }
  } else {
    await fs.unlinkAsync(tempPath);
    res.status(404).send({ message: "Only image files are allowed" });
  }
  return next();
}
