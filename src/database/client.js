const mongoose = require("mongoose");
const Config = require("../config/config").getConfig();
console.log(Config);
const startClient = async function startClient()  {
  // const mongooseOptions = {
  //   useMongoClient: true
  // };
  mongoose.Promise = global.Promise;
  await mongoose.connect(`mongodb://${Config.db.host}/${Config.db.database}`);
  console.log("Mongo has started");
}

module.exports = startClient;