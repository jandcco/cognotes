const {Schema} = require("mongoose");

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  administrators: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  members: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

GroupSchema.methods.addMember(err, function(user){

});

GroupSchema.methods.removeMember(err, function(user){

});

GroupSchema.methods.promoteMemberToAdmin(err, function(groupMember){

});

GroupSchema.methods.demoteMemberFromAdmin(err, function(groupMember){

});

module.exports = GroupSchema;