const express = require("express");
const userController = require("../routes/Controllers/user");
const auth = require("../routes/Controllers/auth");
const router = express.Router();
const passport = require("passport");


const {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
  getNoteCitations
} = require("./Controllers/note");
const {
  getTags,
  deleteTag,
  addTagToNote,
  removeTagFromNote
} = require("./Controllers/tag");
const {
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
} = require("./Controllers/group");
const {
  createCitation,
  deleteCitation,
  updateCitation
} = require("./Controllers/citation");

router.route("/users")
  .get(auth.verifyTokenMiddleWare, userController.getUsers)
  .post(auth.tryRegisterLocal, userController.signedUp)
  .put(auth.verifyTokenMiddleWare, userController.updateUsername)
  .delete(auth.verifyTokenMiddleWare, userController.deleteUser);

router.route("/login")
  .post(auth.tryAuthenticateLocal, userController.loggedIn);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Note routes */

router.post("/note", createNote);
router.get("/note/:id/citations", getNoteCitations);
router.post("/note/:id/citation", createCitation);
router.get("/note", getNotes); // opt :id param to get 1 note, otherwise gets all
router.put("/note/:id", updateNote);
router.post("/note/:noteId/tag/", addTagToNote);
router.delete("/note/:noteId/tag/:tagText", removeTagFromNote);
router.delete("/note/:id", deleteNote);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Tag routes */

router.get("/tag", getTags);
router.delete("/tag/:id", deleteTag);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Group routes */

router.get("/group/:id/join", joinGroup);
router.get("/group/:id", getGroup);
router.post("/group/:id", addNoteToGroup);
router.delete("/group/:groupId/note/:noteId", removeNoteFromGroup);
router.get("/group", getAllGroups);
router.post("/group", createGroup);

router.get("/moderate/group/:id", getPendingMembers);
router.put("/moderate/group/:id/acceptMembers", acceptPendingMembers);
router.put("/moderate/group/:id/admin", promoteMemberToAdmin);
router.delete("/moderate/group/:id/admin", demoteAdminToMember);
router.delete("/moderate/group/:id/member", removeMember);
router.delete("/moderate/group/:id", deleteGroup);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Citation routes */

router.put("/citation/:id", updateCitation);
router.delete("/citation/:id", deleteCitation);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */



module.exports = router;
