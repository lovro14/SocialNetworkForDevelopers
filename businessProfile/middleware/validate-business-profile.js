import validator from "validator";
import { isEmpty } from "../../shared/utils";
import {
  MIN_LENGTH_IDENTITY_NAME,
  MAX_LENGTH_IDENTITY_NAME,
  MAX_LENGTH_BIO
} from "../../shared/validation-constants";

export const validateBusinessProfileData = (req, res, next) => {
  let errors = {};
  const data = req.body;
  data.identityName = isEmpty(data.identityName) ? "" : data.identityName;
  data.status = isEmpty(data.status) ? "" : data.status;
  data.skills = isEmpty(data.skills) ? "" : data.skills;

  if (validator.isEmpty(data.identityName)) {
    errors.identityName = "Profile handle is required";
  } else if (
    !validator.isLength(data.identityName, {
      min: MIN_LENGTH_IDENTITY_NAME,
      max: MAX_LENGTH_IDENTITY_NAME
    })
  ) {
    errors.identityName = "Profile handle needs to be between 2 and 30 chars";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }

  if (!isEmpty(data.bio)) {
    if (!validator.isLength(data.bio, { max: MAX_LENGTH_BIO })) {
      errors.bio = "Profile bio needs to be max 500 chars";
    }
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!isEmpty(data.github)) {
    if (!validator.isURL(data.github)) {
      errors.github = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  return isEmpty(errors) ? next() : res.status(400).send(errors);
};
