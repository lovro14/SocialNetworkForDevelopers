import express from "express";
import {
  registrationDataValidation,
  checkEmailExistance
} from "./middleware/register-validation";
import {
  loginDataValidation,
  checkPassword
} from "./middleware/login-validation";
import UserController from "./controllers/user-controller";
import BusinessProfileController from "../businessProfile/controllers/businessprofile-controller";
import PostController from "../post/controllers/post-controller";
import {
  userResponse,
  logoutResponse,
  deleteUserResponse,
  updateUserResponse
} from "./middleware/response";
import {
  generateToken,
  verifyToken
} from "../shared/middleware/authentication";
import {
  newTokenValidation,
  generateRefreshToken
} from "./middleware/new-token";
import { logoutValidation } from "./middleware/logout";
import { createUserFolder } from "./middleware/file-system";
import { upload } from "./middleware/uploadImage";
import { checkRequest } from "./middleware/helper";

export const userRouter = new express.Router();

// @route   POST api/users
// @desc    Creating new user
// @access  Public
userRouter.post(
  "/",
  registrationDataValidation,
  checkEmailExistance,
  UserController.createUser,
  generateToken,
  createUserFolder,
  userResponse
);

// @route POST api/users/login
// @desc Login user
// @access Public
userRouter.post(
  "/login",
  loginDataValidation,
  checkPassword,
  generateToken,
  userResponse
);

// @route POST api/users/new-token
// @desc Creating new access token with refresh token
// @access Public
userRouter.post(
  "/new-token",
  newTokenValidation,
  generateToken,
  generateRefreshToken,
  userResponse
);

// @route POST api/users/logout
// @desc Logout user
// @access Private
userRouter.post("/logout", verifyToken, logoutValidation, logoutResponse);

userRouter.delete(
  "/",
  verifyToken,
  UserController.delete,
  BusinessProfileController.delete,
  PostController.delete,
  deleteUserResponse
);

userRouter.post(
  "/profile-picture",
  checkRequest,
  verifyToken,
  upload,
  UserController.setProfilePicture,
  generateToken,
  updateUserResponse
);
