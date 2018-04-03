const Citation = require("../Models/Citation");

const CreateCitation = async (note, url, caption, publication) => {
  const newCitation = new Citation({
    url,
    caption,
    publication,
    note
  })

  await newCitation.save();
  return newCitation;
}

module.exports = CreateCitation;