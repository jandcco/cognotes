const User = require("../Models/User");
const Note = require("../Models/Note");
const GetNotesByUserId = async (id) => {
  return await Note.find({owner:id});
}

module.exports = GetNotesByUserId;