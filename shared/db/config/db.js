export default {
  connectionStringDev:
    process.env.MONGO_URI_DEV || "mongodb://localhost:27017/socialNetworkDevelopers",
  connectionStringProduction: process.env.MONGO_URI_PRODUCTION
};
