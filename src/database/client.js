import mongoose from "mongoose";
const Config = require("../config/config").getConfig();

export default async function startClient()  {
  const mongooseOptions = {
    useMongoClient: true
  };
  mongoose.Promise = global.Promise;
  await mongoose.connect(`mongodb://${Config.db.host}/${Config.db.database}`, mongooseOptions);
}
