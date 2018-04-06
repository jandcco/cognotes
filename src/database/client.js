const mongoose = require("mongoose");
const Config = require("../config/config").getConfig();
const startClient = async function startClient()  {
  mongoose.Promise = global.Promise;
  let uri = (Config.db.mongoUri) ? Config.db.mongoUri : `mongodb://${Config.db.host}/${Config.db.database}`
  const connection = await mongoose.connect(uri);
  console.log("Mongo has started");
}

module.exports = startClient;
