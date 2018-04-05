const Tag = require("../Models/Tag");
/*
  Tags are created with one note associated note, but become associated with more notes over time.
*/
const CreateTag = async (tagText, associatedNoteId) => {
  // XXX: There is no checking against whether the tag currently exists in the db!
  const extantTag = await Tag.find({text: tagText});
  if (extantTag) {
    extantTag.addNote(associatedNoteId);
    return extantTag;
  } else {
    const newTag = new Tag({
      text: tagText,
      notes: [associatedNoteId],
      notesCounter: 1
    });
    await newTag.save();
    return newTag;
  }
};

module.exports = CreateTag;
