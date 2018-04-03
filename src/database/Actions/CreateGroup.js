const Group = require("../Models/Group");

const CreateGroup = async (name, foundingUser) => {
  try {
    const newGroup = new Group({
      name
    })
  
    await newGroup.save();
    newGroup.addMember(foundingUser);
    newGroup.promoteMemberToAdmin(foundingUser);
    return newGroup;

  } catch (e){
    throw e;
  }
}

module.exports = CreateGroup;