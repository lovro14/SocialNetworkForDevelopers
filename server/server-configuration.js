import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import multer from "multer";
import { initializeRoutes } from "./routes-configuration";
import cors from "cors";
import express from "express";

const constants = {
  CUSTOMIZED_LOGGER:
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"' +
    ' :status :response-time ms :res[content-length] ":referrer" ":user-agent"'
};

export const configure = app => {
  app.use(
    morgan(constants.CUSTOMIZED_LOGGER, {
      skip: function(req, res) {
        return res.statusCode < 400;
      },
      stream: process.stderr
    })
  );

  app.use(
    morgan(constants.CUSTOMIZED_LOGGER, {
      skip: function(req, res) {
        return res.statusCode >= 400;
      },
      stream: process.stdout
    })
  );

  app.use(
    multer({ dest: path.join(__dirname, "public/upload/temp") }).single("file")
  );
  app.use("/public/", express.static(path.join(__dirname, "../public")));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  initializeRoutes(app);

  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send(err);
  });
};
