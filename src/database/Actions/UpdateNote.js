const Note = require("../Models/Note");

const EditNote = async (noteId, updatedText) => {
  const note = await Note.findOne({"_id":noteId});
  note.text = updatedText;
  await note.save();
  return note;
}

module.exports = EditNote
