const Citation = require("../Models/Citation");


const UpdateCitatation = async (originalCitation, newCaption, newUrl, newPublication) => {
  originalCitation.caption = newCaption;
  originalCitation.url = newUrl;
  originalCitation.publication = newPublication;
  await originalCitation.save();
}

module.exports = UpdateCitatation;