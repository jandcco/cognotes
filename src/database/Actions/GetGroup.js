const Group = require("../Models/Group");

const GetGroup = async (groupId) => {
  return await Group.find({_id: groupId});
};

module.exports = GetGroup;
