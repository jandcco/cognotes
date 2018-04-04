const Citation = require("../Models/Citation");

const DeleteCitation = async (citationId) => {
  try{
    await Citation.findOneAndRemove({_id: citationId});
  } catch (e){
    throw e;
  }
};

module.exports = DeleteCitation;
