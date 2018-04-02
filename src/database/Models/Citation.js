const mongoose = require("mongoose");
const CitationSchema = require("./CitationSchema")

module.exports = mongoose.model("Citation", CitationSchema);
