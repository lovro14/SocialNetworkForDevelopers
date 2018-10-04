import { isEmpty } from "../../shared/utils";

export const checkRequest = (req, res, next) => {
  const contentType = req.header("content-type");
  if (contentType.indexOf("multipart/form-data") !== -1) {
    if (!isEmpty(req.file)) {
      return next();
    }
  }
  return res.status(400).send({ message: "Bad Request" });
};
