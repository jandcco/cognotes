const Group = require("../Models/Group");

const DeleteGroup = async (groupId) => {
  try{
    await Group.findOneAndRemove({_id: groupId});
  } catch (e){
    throw e;
  }
}

module.exports = DeleteGroup;