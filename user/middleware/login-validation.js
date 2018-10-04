import { isEmpty } from "../../shared/utils";
import UserRepository from "../data/user-repository";
import validator from "validator";
import bycrptjs from "bcryptjs";
import uuidv4 from "uuid/v4";

export const loginDataValidation = async (req, res, next) => {
  let data = req.body;
  let errors = {};
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!isEmpty(errors)) {
    return res.status(400).send(errors);
  }
  return next();
};

export const checkPassword = async (req, res, next) => {
  try {
    const user = await UserRepository.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ email: "Email not exists" });
    }
    if (bycrptjs.compareSync(req.body.password, user.password)) {
      req.refreshToken = bycrptjs.hashSync(uuidv4(), bycrptjs.genSaltSync(8));
      await UserRepository.update(
        { _id: user._id },
        {
          $push: { refreshTokens: req.refreshToken }
        },
        {}
      );
      req.user = user;
      return next();
    }
    return res.status(400).send({ password: "Invalid Password" });
  } catch (err) {
    return next(err);
  }
};
