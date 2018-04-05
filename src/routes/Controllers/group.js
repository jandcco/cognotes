const CreateGroup = require("../../database/Actions/CreateGroup");
const DeleteGroup = require("../../database/Actions/DeleteGroup");
const GetGroup = require("../../database/Actions/GetGroup");
const GetGroups = require("../../database/Actions/GetGroups");
const GetNote =  require("../../database/Actions/GetNote");


/**
 * Given a request parameter :id (group id), creates
 * a request for currently authenticated user to join
 * group. If no authenticated user, sends 401 response.
 * @param  {object}  req
 * @param  {object}  res
 * @return {undefined}
 */
const joinGroup = async (req, res) => {
  const groupId = req.params.id;
  const userId = req.session.passport.id;
  if (!userId) return res.status(401);
  try {
    await GetGroup(groupId).addPendingMember(userId);
    res.status(200);
  } catch (e) {
    throw e;
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Public group routes
//

/**
 * Given a key 'name' on request body and an id via passport auth,
 * creates a new group and responds with that group.
 * If no authenticated user, sends 401 response.
 * @param  {object}  req
 * @param  {object}  res
 * @return {undefined}
 */
const createGroup = async (req, res) => {
  const userId = req.session.passport.id;
  if (!userId) return res.status(401);
  let newGroup = await CreateGroup(req.body.name, userId);
  res.status(200).send(newGroup);
};

/**
 * Gets all the groups.
 * TODO: Do we want users to be authenicated to be able to see groups?
 * (currently anyone can)
 * @param  {object}  req
 * @param  {object}  res
 * @return {Promise}
 */
const getAllGroups = async (req, res) => {
  try {
    const groups = await GetGroups();
    res.status(200).send(groups);
  } catch (e) {
    throw e;
  }
};

/**
 * Given an :id in the req parameters, gets that group.
 * @param  {object}  req
 * @param  {object}  res
 * @return {undefined}
 */
const getGroup = async (req, res) => {
  const groupId = req.params.id;
  try {
    const group = await GetGroup(groupId);
    res.status(200).send(group);
  } catch (e) {
    throw e;
  }
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Participating in Groups (Members or Admins only)
//

/**
 * Adds a note to group (if the user is the note owner and
 * a member or admin of the group).
 * @param  {object}  req Needs: param :id which is groupId, body key noteId
 * @param  {object}  res [description]
 * @return {Promise}     [description]
 */
const addNoteToGroup = async (req, res) => {
  const userId = req.session.passport.id;
  if (!userId) return res.status(401);
  const groupId = req.param.id;
  const noteId = req.body.noteId;
  let group = await GetGroup(groupId);
  let note = await GetNote(noteId);
  if (note.owner == userId && (group.administrators.indexOf(userId) >= 0|| group.members.indexOf(userId) >= 0)) {
    group.addNote(noteId);
    res.status(200);
  } else {
    res.status(403);
  }
};

/**
 * Removes a note from a group.
 * Only the note owner or a group admin can remove a note.
 * @param  {object}  req has param :id (group Id) and body key noteId
 * @param  {object}  res [description]
 * @return {Promise}     [description]
 */
const removeNoteFromGroup = async (req, res) => {
  const userId = req.session.passport.id;
  if (!userId) return res.status(401);
  const groupId = req.param.id;
  const noteId = req.body.noteId;
  let group = await GetGroup(groupId);
  let note = await GetNote(noteId);
  if (note.owner == userId || group.administrators.indexOf(userId) >= 0) {
    group.removeNote(noteId);
    res.status(200);
  } else {
    res.status(403);
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Moderating Groups (Group Admins only)
//

/**
 * Given a param :id on request, deletes the group with that id,
 * as long as authenticated user is a group admin.
 * @param  {object}  req
 * @param  {object}  res
 * @return {undefined}
 */
const deleteGroup = async (req, res) => {
  const userId = req.session.passport.id;
  if (!userId) return res.status(401);
  const groupId = req.param.id;
  let group = await GetGroup(groupId);
  if (group.administrators.indexOf(userId) >= 0) {
    try {
      await DeleteGroup(groupId);
      res.status(200);
    } catch (e) {
      throw e;
    }
  } else {
    res.status(403);
  }
};

/**
 * Gets pending members of a group if the authenicated
 * user is an admin.
 * @param  {object}  req :id in params is groupId
 * @param  {object}  res [description]
 * @return {Promise}     [description]
 */
const getPendingMembers = async (req, res) => {
  const userId = req.session.passport.id;
  if (!userId) return res.status(401);
  const groupId = req.param.id;
  let group = await GetGroup(groupId);
  if (group.administrators.indexOf(userId) >= 0) {
    try {
      res.status(200).send(group.pendingMembers);
    } catch (e) {
      throw e;
    }
  } else {
    res.status(403);
  }
};

/**
 * With the group :id in request params &
 * an array 'members' (of user ids) on the request body,
 * adds those members to the group & removes
 * them from pendingMembers.
 * @param  {object}  req
 * @param  {object}  res
 * @return {undefined}
 */
const acceptPendingMembers = async (req, res) => {
  const userId = req.session.passport.id;
  if (!userId) return res.status(401);
  const groupId = req.param.id;
  const acceptedMembers = req.body.members;
  let group = await GetGroup(groupId);
  if (group.administrators.indexOf(userId) >= 0) {
    try {
      let newMemberId = acceptedMembers.pop();
      while (newMemberId) {
        group.acceptMember(newMemberId);
        newMemberId = acceptedMembers.pop();
      }
      res.status(200).send(group.pendingMembers);
    } catch (e) {
      throw e;
    }
  } else {
    res.status(403);
  }
};

/**
 * Needs a group id ':id' in req params,
 * needs memberId in req body of the member to promote to admin.
 *
 * @param  {object}  req
 * @param  {object}  res
 * @return {undefined}
 */
const promoteMemberToAdmin = async (req, res) => {
  const userId = req.session.passport.id;
  if (!userId) return res.status(401);
  const groupId = req.param.id;
  const newAdminId = req.body.memberId;
  let group = await GetGroup(groupId);
  if (group.administrators.indexOf(userId) >= 0) {
    try {
      group.promoteMemberToAdmin(newAdminId);
      res.status(200);
    } catch (e) {
      throw e;
    }
  } else {
    res.status(403);
  }
};

/**
 * Given a memberId key in body, authenticated
 * group admin 'id' from passport, & groupId as
 * :id in params, removes that member
 * from the group. (does not remove admins, could change
 * GroupSchema.removeMember if we want it to in future.)
 * @param  {object}  req [description]
 * @param  {object}  res [description]
 * @return {Promise}     [description]
 */
const removeMember = async (req, res) => {
  const userId = req.session.passport.id;
  if (!userId) return res.status(401);
  const groupId = req.param.id;
  const memberId = req.body.memberId;
  let group = await GetGroup(groupId);
  if (group.administrators.indexOf(userId) >= 0) {
    try {
      group.removeMember(memberId);
      res.status(200);
    } catch (e) {
      throw e;
    }
  } else {
    res.status(403);
  }
};

/**
 * Demotes an admin to a regular group member.
 * (Admins can remove themselves, but trying to remove the last admin
 * sends a 409 (Conflict) response.)
 * @param  {object}  req has: param :id (groupId), body key adminId
 * @param  {object}  res
 * @return {Promise}     resolution unimportant
 */
const demoteAdminToMember = async (req, res) => {
  const userId = req.session.passport.id;
  if (!userId) return res.status(401);
  const groupId = req.param.id;
  const adminId = req.body.adminId;
  let group = await GetGroup(groupId);
  if (group.administrators.indexOf(userId) >= 0) {
    if (group.administrators.length < 2) return res.status(409);
    try {
      group.demoteMemberFromAdmin(adminId);
      res.status(200);
    } catch (e) {
      throw e;
    }
  } else {
    res.status(403);
  }
};




module.exports = {
  createGroup,
  joinGroup,
  deleteGroup,
  getAllGroups,
  getGroup,
  getPendingMembers,
  promoteMemberToAdmin,
  demoteAdminToMember,
  removeMember,
  addNoteToGroup,
  removeNoteFromGroup,
  acceptPendingMembers,
};
