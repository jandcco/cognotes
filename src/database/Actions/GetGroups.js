const Group = require("../Models/Group");

const GetGroups = async () => {
  return await Group.find({});
};

module.exports = GetGroups;
