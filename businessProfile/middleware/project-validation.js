import validator from "validator";
import { isEmpty } from "../../shared/utils";
import moment from "moment";
import {
  DATE_FORMAT,
  MAX_LENGTH_PROJECT_SUMMARY,
  MAX_LENGTH_PROJECT_CONTRIBUTION
} from "../../shared/validation-constants";
import mongoose from "mongoose";
import BusinessProfileRepository from "../data/businessprofile-repository";

export const checkProjectData = (req, res, next) => {
  const data = req.body;
  data.title = isEmpty(data.title) ? "" : data.title;
  data.projectSummary = isEmpty(data.projectSummary) ? "" : data.projectSummary;
  data.from = isEmpty(data.from) ? "" : data.from;
  data.to = isEmpty(data.to) ? "" : data.to;
  data.role = isEmpty(data.role) ? "" : data.role;
  data.contribution = isEmpty(data.contribution) ? "" : data.contribution;
  data.technologies = isEmpty(data.technologies) ? "" : data.technologies;

  let errors = {};

  if (validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (validator.isEmpty(data.projectSummary)) {
    errors.projectSummary = "Project summary field is required";
  } else if (
    !validator.isLength(data.projectSummary, {
      max: MAX_LENGTH_PROJECT_SUMMARY
    })
  ) {
    errors.projectSummary =
      "Project Summary can't have more than 500 characters";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  } else if (!moment(data.from, DATE_FORMAT, true).isValid()) {
    errors.from = "From date has invalid format, please use YYYY-MM-DD format";
  }

  if (validator.isEmpty(data.to)) {
    errors.to = "To date is required";
  } else if (!moment(data.to, DATE_FORMAT, true).isValid()) {
    errors.to = "To date has invalid format, please use YYYY-MM-DD format";
  }

  if (validator.isEmpty(data.role)) {
    errors.role = "Role field is required";
  }

  if (validator.isEmpty(data.contribution)) {
    errors.contribution = "Contribution field is required";
  } else if (
    !validator.isLength(data.contribution, {
      max: MAX_LENGTH_PROJECT_CONTRIBUTION
    })
  ) {
    errors.contribution = "Contribution can't have more than 500 characters";
  }

  if (validator.isEmpty(data.technologies)) {
    errors.technologies = "Technologies field is required";
  }

  if (!isEmpty(data.to)) {
    if (!moment(data.to, DATE_FORMAT, true).isValid()) {
      errors.to = "To date has invalid format, please use YYYY-MM-DD format";
    }
  }

  return isEmpty(errors) ? next() : res.status(400).send(errors);
};

export const checkProjectId = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.project_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }
  try {
    const businessProfile = await BusinessProfileRepository.findOne({
      userId: req.authData._id,
      projects: { $elemMatch: { _id: req.params.project_id } }
    });
    return isEmpty(businessProfile)
      ? res.status(404).send({ message: "Not Found" })
      : next();
  } catch (err) {
    return next(err);
  }
};
