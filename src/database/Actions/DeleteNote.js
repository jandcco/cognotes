const Note = require("../Models/Note");

const DeleteNote = async (noteId) => {
  try{
    await Note.findOneAndRemove({_id: noteId});
  } catch (e){
    throw e;
  }
}

module.exports = DeleteNote;