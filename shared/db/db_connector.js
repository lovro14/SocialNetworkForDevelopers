import mongoose from "mongoose";
import _ from "lodash";

const constants = {
  DEV: "dev",
  PRODUCTION: "production"
};

class DbConnector {
  constructor(dbConf) {
    this.dbConf = dbConf;
  }

  // Connect to database
  connect(env, cb) {
    let connectionString = "";
    if (_.isEqual(env, constants.DEV)) {
      connectionString = this.dbConf.connectionStringDev;
    } else if (_.isEqual(env, constants.PRODUCTION)) {
      connectionString = this.dbConf.connectionStringProduction;
    }
    mongoose.connect(
      connectionString,
      { useNewUrlParser: true },
      err => {
        if (err) {
          console.log(`ERROR connecting to: ${connectionString}. ${err}`);
          cb(new Error("Error while connecting to database."));
        } else {
          console.log('Successfully connected to database');
          cb();
        }
      }
    );
  };

  disconnect(cb) {
    mongoose.disconnect(() => {
      log("All connections are disconnected");
      cb();
    });
  };
}

export default DbConnector;
