const Citations = require("../Models/Citation");

const GetCitation = async (citationId) => {
  return await Citations.find({_id: citationId});
};

module.exports = GetCitation;
