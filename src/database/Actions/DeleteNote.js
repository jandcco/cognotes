const Note = require("../Models/Note");

const DeleteNote = async (noteId) => {
  try{
    // XXX: This delete function should also handle removing from tagslist and groups
    await Note.findOneAndRemove({_id: noteId});
  } catch (e){
    throw e;
  }
}

module.exports = DeleteNote;