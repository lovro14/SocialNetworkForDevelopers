import validator from "validator";
import { isEmpty } from "../../shared/utils";
import moment from "moment";
import {
  DATE_FORMAT,
  MAX_LENGTH_EDUCATION_DESC
} from "../../shared/validation-constants";
import BusinessProfileRepository from "../data/businessprofile-repository";
import mongoose from "mongoose";

export const validateEducationData = (req, res, next) => {
  const data = req.body;
  data.collegeName = isEmpty(data.collegeName) ? "" : data.collegeName;
  data.degree = isEmpty(data.degree) ? "" : data.degree;
  data.from = isEmpty(data.from) ? "" : data.from;
  data.fieldOfStudy = isEmpty(data.fieldOfStudy) ? "" : data.fieldOfStudy;

  let errors = {};

  if (validator.isEmpty(data.collegeName)) {
    errors.collegeName = "College Name field is required";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  } else if (!moment(data.from, DATE_FORMAT, true).isValid()) {
    errors.from = "From date has invalid format, please use YYYY-MM-DD format";
  }

  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Field of Study field is required";
  }

  if (!isEmpty(data.description)) {
    if (
      !validator.isLength(data.description, { max: MAX_LENGTH_EDUCATION_DESC })
    ) {
      errors.description = "Description can't have more than 500 characters";
    }
  }

  if (!isEmpty(data.to)) {
    if (!moment(data.to, DATE_FORMAT, true).isValid()) {
      errors.to = "To date has invalid format, please use YYYY-MM-DD format";
    }
  }

  return isEmpty(errors) ? next() : res.status(400).send(errors);
};

export const checkEducationId = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.education_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }
  try {
    const businessProfile = await BusinessProfileRepository.findOne({
      userId: req.authData._id,
      education: { $elemMatch: { _id: req.params.education_id } }
    });
    return isEmpty(businessProfile)
      ? res.status(404).send({ message: "Not Found" })
      : next();
  } catch (err) {
    return next(err);
  }
};
