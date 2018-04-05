const {Schema} = require("mongoose");

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  administrators: {
    type: [Schema.Types.ObjectId],
    ref: "User"
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: "User"
  },
  notes: {
    type: [Schema.Types.ObjectId],
    ref: "Note"
  },
  pendingMembers: {
    type: [Schema.Types.ObjectId],
    ref: "User"
  }
});

/**
 * Adds a new user to pendingMembers
 * @param  {String} userId
 * @return {undefined}
 */
GroupSchema.methods.addPendingMember = function(userId) {
  this.pendingMembers.push(userId);
};

/**
 * Accepts a pending member from pendingMembers as a group member
 * @param  {String} userId
 * @return {undefined}
 */
GroupSchema.methods.acceptMember = function(userId) {
  this.members.push(userId);
  this.pendingMembers.splice(this.pendingMembers.indexOf(userId), 1)
};

/**
 * Rejects a pending member by removing them from pendingMembers.
 * @param  {String} userId
 * @return {undefined}
 */
GroupSchema.methods.rejectMember = function(userId) {
  this.pendingMembers.splice(this.pendingMembers.indexOf(userId), 1)
};

/**
 * Removes a member (not admin) from the group
 * @param  {String} userId
 * @return {undefined}
 */
GroupSchema.methods.removeMember = function(userId){
  this.members.splice(this.members.indexOf(userId), 1)
};

/**
 * Adds member to administrators, removes from members array (if exists there).
 * @param  {String} groupMemberId ObjectId of the group member to promote
 * @return {undefined}
 */
GroupSchema.methods.promoteMemberToAdmin = function(groupMemberId){
  this.administrators.push(groupMemberId);
  let memberIndex = this.members.indexOf(groupMemberId)
  if (memberIndex >= 0){
    this.members.splice(this.members.indexOf(groupMemberId), 1);
  }
};

/**
 * Adds member to members, removes from administrators
 * @param  {String} groupMemberId
 * @return {undefined}
 */
GroupSchema.methods.demoteMemberFromAdmin = function(groupMemberId){
  this.members.push(groupMemberId);
  this.administrators.splice(this.administrators.indexOf(groupMemberId), 1);
};

GroupSchema.methods.addNote = function(noteId) {
  this.notes.push(noteId);
};

GroupSchema.methods.removeNote = function(noteId) {
  let index = this.notes.indexOf(noteId);
  if (index >= 0) this.notes.splice(index, 1);
}

module.exports = GroupSchema;
