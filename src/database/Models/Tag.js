const mongoose = require("mongoose");
const TagSchema = require("./TagSchema");

module.exports = mongoose.model("Tag", TagSchema)
