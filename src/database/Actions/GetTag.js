const Tags = require("../Models/Tag");

const GetTag = async (tagText) => {
  return await Tags.find({text: tagText});
};

module.exports = GetTag;
