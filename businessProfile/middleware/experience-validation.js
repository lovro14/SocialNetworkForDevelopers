import validator from "validator";
import { isEmpty } from "../../shared/utils";
import moment from "moment";
import {
  DATE_FORMAT,
  MAX_LENGTH_EXPERIENCE_DESC
} from "../../shared/validation-constants";
import BusinessProfileRepository from "../data/businessprofile-repository";
import mongoose from "mongoose";

export const validateExperienceData = (req, res, next) => {
  const data = req.body;
  data.title = isEmpty(data.title) ? "" : data.title;
  data.company = isEmpty(data.company) ? "" : data.company;
  data.from = isEmpty(data.from) ? "" : data.from;
  data.description = isEmpty(data.description) ? "" : data.description;

  let errors = {};

  if (validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  } else if (!moment(data.from, DATE_FORMAT, true).isValid()) {
    errors.from = "From date has invalid format, please use YYYY-MM-DD format";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  } else if (
    !validator.isLength(data.description, { max: MAX_LENGTH_EXPERIENCE_DESC })
  ) {
    errors.description = "Description can't have more than 500 characters";
  }

  if (!isEmpty(data.to)) {
    if (!moment(data.to, DATE_FORMAT, true).isValid()) {
      errors.to = "To date has invalid format, please use YYYY-MM-DD format";
    }
  }

  return isEmpty(errors) ? next() : res.status(400).send(errors);
};

export const checkExperienceId = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.experience_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }
  try {
    const businessProfile = await BusinessProfileRepository.findOne({
      userId: req.authData._id,
      experience: { $elemMatch: { _id: req.params.experience_id } }
    });
    return isEmpty(businessProfile)
      ? res.status(404).send({ message: "Not Found" })
      : next();
  } catch (err) {
    return next(err);
  }
};
