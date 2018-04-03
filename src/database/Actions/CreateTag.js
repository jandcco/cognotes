const Tag = require("../Models/Tag");

/*
  Tags are created with one note associated note, but become associated with more notes over time.
*/
const CreateTag = async (tagText, associatedNote) => {
  // XXX: There is no checking against whether the tag currently exists in the db!
  
  const newTag = new Tag({
    text: tagText,
    notes: [associatedNote]
  })

  await newTag.save();
  return newTag;
}

module.exports = CreateTag;