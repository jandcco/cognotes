const Citation = require("../Models/Citation");
const Note = require("../Models/Note");
const GetNoteCitations = async (noteId) => {
  const note = await Note.findOne({_id: noteId});
  if (note){
    return await Citation.find({note: noteId});
  }
  return null;
};

module.exports = GetNoteCitations;
