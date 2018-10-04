import express from "express";
import { userRouter } from "../user";
import { businessProfileRouter } from "../businessProfile";
import { postRouter } from "../post";

export const router = new express.Router();

export const initializeRoutes = app => {
  router.use("/api/users", userRouter);
  router.use("/api/business-profile", businessProfileRouter);
  router.use("/api/posts", postRouter);
  app.use(router);
  app.use((req, res, next) => {
    res.status(404).send({ message: "Not found any appropriate route" });
  });
};
