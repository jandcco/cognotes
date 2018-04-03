const Tags = require("../Models/Tag");

const GetTags = async () => {
  return await Tags.find({});
}

module.exports = GetTags;