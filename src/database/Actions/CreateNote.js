const Note = require("../Models/Note");


const CreateNote = async (owner, text, title, tags) => {
  const newNote = new Note({
    text,
    title,
    owner,
    tags
  });
  await newNote.save();
  return newNote;
}

module.exports = CreateNote;