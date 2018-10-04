import express from "express";
import { verifyToken } from "../shared/middleware/authentication";
import {
  validatePostData,
  validatePostId,
  checkPostOwner
} from "./middleware/post-validation";
import {
  validateCommentData,
  validateCommentId
} from "./middleware/comment-validation";
import {
  postResponse,
  postDeleteResponse,
  getPostsResponse,
  getPostResponse
} from "./middleware/response";
import PostController from "./controllers/post-controller";

export const postRouter = new express.Router();

postRouter.post(
  "/",
  verifyToken,
  validatePostData,
  PostController.addPost,
  postResponse
);

postRouter.get("/", verifyToken, PostController.get, getPostsResponse);

postRouter.get(
  "/:post_id",
  verifyToken,
  validatePostId,
  PostController.getPost,
  getPostResponse
);
postRouter.delete(
  "/:post_id",
  verifyToken,
  validatePostId,
  checkPostOwner,
  PostController.deletePost,
  postDeleteResponse
);

postRouter.patch(
  "/:post_id",
  verifyToken,
  validatePostId,
  checkPostOwner,
  validatePostData,
  PostController.updatePost,
  postResponse
);

postRouter.post(
  "/:post_id/comment",
  verifyToken,
  validatePostId,
  validateCommentData,
  PostController.addComment,
  postResponse
);

postRouter.delete(
  "/:post_id/comment/:comment_id",
  verifyToken,
  validatePostId,
  validateCommentId,
  PostController.deleteComment,
  postResponse
);

postRouter.patch(
  "/:post_id/comment/:comment_id",
  verifyToken,
  validatePostId,
  validateCommentData,
  validateCommentId,
  PostController.updateComment,
  postResponse
);

postRouter.post(
  "/:post_id/like",
  verifyToken,
  validatePostId,
  PostController.like,
  postResponse
);

postRouter.post(
  "/:post_id/unlike",
  verifyToken,
  validatePostId,
  PostController.unlike,
  postResponse
);
