const Tag = require("../Models/Tag");

const DeleteTag = async (tagText) => {
  try{
    await Tag.findOneAndRemove({text: tagText});
  } catch (e){
    throw e;
  }
}

module.exports = DeleteTag;