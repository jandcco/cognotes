const Note = require("../Models/Note");

const GetNotes = async () => {
  return await Note.find({});
};

module.exports = GetNotes;
