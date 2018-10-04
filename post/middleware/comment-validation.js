import validator from "validator";
import { isEmpty } from "../../shared/utils";
import {
  MIN_LENGTH_COMMENT,
  MAX_LENGTH_COMMENT
} from "../../shared/validation-constants";
import mongoose from "mongoose";
import PostRepository from "../data/post-repository";

export const validateCommentData = (req, res, next) => {
  const data = req.body;
  data.text = isEmpty(data.text) ? "" : data.text;

  let errors = {};

  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  } else if (
    !validator.isLength(data.text, {
      min: MIN_LENGTH_COMMENT,
      max: MAX_LENGTH_COMMENT
    })
  ) {
    errors.text = "Comment must be between 3 and 300 characters";
  }
  return isEmpty(errors) ? next() : res.status(400).send(errors);
};

export const validateCommentId = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.comment_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }
  try {
    const comment = await PostRepository.findOne({
      _id: req.params.post_id,
      comments: {
        $elemMatch: { _id: req.params.comment_id, userId: req.authData._id }
      }
    });
    console.log(comment)
    return isEmpty(comment)
      ? res.status(404).send({ message: "Not Found" })
      : next();
  } catch (err) {
    return next(err);
  }
};
