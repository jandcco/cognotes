const Group = require("../Models/Group");

const CreateGroup = async (name, foundingUserId) => {
  try {
    const newGroup = new Group({
      name
    });

    await newGroup.save();
    newGroup.promoteMemberToAdmin(foundingUserId);
    return newGroup;

  } catch (e){
    throw e;
  }
};

module.exports = CreateGroup;
