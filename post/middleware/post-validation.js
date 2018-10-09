import validator from "validator";
import { isEmpty } from "../../shared/utils";
import {
  MIN_LENGTH_POST,
  MAX_LENGTH_POST
} from "../../shared/validation-constants";
import mongoose from "mongoose";
import PostRepository from "../data/post-repository";
import BusinessProfileRepository from "../../businessProfile/data/businessprofile-repository";

export const validatePostData = (req, res, next) => {
  if (isEmpty(req.body.identityName) && req.method==="POST") {
    return res.status(400).send({ message: "Bad Request" });
  }
  const data = req.body;
  data.text = isEmpty(data.text) ? "" : data.text;

  let errors = {};

  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  } else if (
    !validator.isLength(data.text, {
      min: MIN_LENGTH_POST,
      max: MAX_LENGTH_POST
    })
  ) {
    errors.text = "Post must be between 5 and 500 characters";
  }
  return isEmpty(errors) ? next() : res.status(400).send(errors);
};

export const validatePostId = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.post_id)) {
    console.log("alooooooooooooooooooo")
    return res.status(400).send({ message: "Bad Request" });
  }
  try {
    req.fetchedPost = await PostRepository.findOne({ _id: req.params.post_id });
    if (isEmpty(req.fetchedPost)) {
      return res.status(404).send({ message: "Not Found" });
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

export const checkPostOwner = (req, res, next) => {
  if (req.fetchedPost.userId.toString() !== req.authData._id) {
    return res.status(403).send({ message: "Forbidden" });
  }
  return next();
};

export const validateIdentityName = async (req, res, next) => {
  if (isEmpty(req.body.identityName)) {
    return res.status(400).send({ message: "Bad Request" });
  }
  try {
    const user = await BusinessProfileRepository.findOne({
      identityName: req.body.identityName
    });
    if (isEmpty(user)) {
      return res.status(404).send({ message: "Not Found" });
    }
    return next();
  } catch (err) {
    console.log(err);
  }
};
