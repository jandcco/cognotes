const Note = require("../Models/Note");

const EditNote = async (noteId, updatedTitle, updatedText) => {
  const note = await Note.findOne({_id:noteId});
  note.text = updatedText;
  note.title = updatedTitle;
  await note.save();
  return note;
};

module.exports = EditNote;
