import { isEmpty } from "../../shared/utils";
import validator from "validator";
import {
  MIN_LENGTH_NAME,
  MAX_LENGTH_NAME,
  MIN_LENGTH_PASSWORD
} from "../../shared/validation-constants";
import UserRepository from "../data/user-repository";

export const registrationDataValidation = (req, res, next) => {
  let data = req.body;
  let errors = {};
  data.name = isEmpty(data.name) ? "" : data.name;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.confirmedPassword = isEmpty(data.confirmedPassword)
    ? ""
    : data.confirmedPassword;

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  } else if (
    !validator.isLength(data.name, {
      min: MIN_LENGTH_NAME,
      max: MAX_LENGTH_NAME
    })
  ) {
    errors.name = "Name must be between 3 and 50 characters";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!validator.isLength(data.password, { min: MIN_LENGTH_PASSWORD })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(data.confirmedPassword)) {
    errors.confirmedPassword = "Confirmed Password field is required";
  } else if (!validator.equals(data.password, data.confirmedPassword)) {
    errors.confirmedPassword = "Passwords must match";
  }

  if (isEmpty(errors)) {
    return next();
  } else {
    return res.status(400).send(errors);
  }
};

export const checkEmailExistance = async (req, res, next) => {
  try {
    const user = await UserRepository.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ email: "User already exists" });
    }
    return next();
  } catch (error) {
    return next(err);
  }
};
