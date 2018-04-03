const Note = require("../Models/Note");

const GetNote = async (noteID) => {
  return await Note.find({_id: noteID});
};

module.exports = GetNote;
