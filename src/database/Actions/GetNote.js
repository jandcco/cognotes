const Note = require("../Models/Note");

const GetNote = async (noteID) => {
  const note = await Note.findOne({_id: noteID});
  return note;
};

module.exports = GetNote;
