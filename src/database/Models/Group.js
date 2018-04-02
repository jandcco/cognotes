const mongoose = require("mongoose");
const GroupSchema = require("./GroupSchema");

module.exports = mongoose.model("Group", GroupSchema);