import {} from "dotenv/config";
import express from "express";
import DbConnector from "./shared/db/db_connector";
import dbConf from "./shared/db/config/db";
import { configure } from "./server/server-configuration";

const dbConnector = new DbConnector(dbConf);
let app = express();
console.log(process.env.NODE_ENV);
dbConnector.connect(
  process.env.NODE_ENV,
  err => {
    if (err) {
      throw err;
    }
    app.set("port", process.env.PORT || 8000);
    configure(app);
    app.listen(app.get("port"), "127.0.0.1", () => {
      console.log(`Server up: http://localhost:${app.get("port")}`);
    });
  }
);

export default app;
