const Note = require("../Models/Note");


const CreateNote = async (owner, text, title) => {
  const newNote = new Note({
    text,
    title,
    owner,
  });
  await newNote.save();
  return newNote;
}

module.exports = CreateNote;
