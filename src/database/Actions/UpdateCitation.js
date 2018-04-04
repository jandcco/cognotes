// const Citation = require("../Models/Citation");


const UpdateCitation = async (originalCitation, newUrl, newCaption, newPublication) => {

  originalCitation.caption = newCaption;
  originalCitation.url = newUrl;
  originalCitation.publication = newPublication;
  await originalCitation.save();
  return originalCitation;
};

module.exports = UpdateCitation;
