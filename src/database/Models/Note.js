const mongoose = require("mongoose");
const NoteSchema = require("./NoteSchema")

module.exports = mongoose.model("Note", NoteSchema)