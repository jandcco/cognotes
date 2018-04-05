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

router.post("/note", noteController.createNote);
router.get("/note/:id/citations", noteController.getNoteCitations);
router.post("/note/:id/citation", citationController.createCitation);
router.get("/note", noteController.getNotes); // opt :id param to get 1 note, otherwise gets all
router.put("/note/:id", noteController.updateNote);
router.post("/note/:noteId/tag/", tagController.addTagToNote);
router.delete("/note/:noteId/tag/:tagText", tagController.removeTagFromNote);
router.delete("/note/:id", noteController.deleteNote);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Tag routes */

router.get("/tag", tagController.getTags);
router.delete("/tag/:id", tagController.deleteTag);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Group routes */

router.get("/group/:id/join", groupController.joinGroup);
router.get("/group/:id", groupController.getGroup);
router.post("/group/:id", groupController.addNoteToGroup);
router.delete("/group/:groupId/note/:noteId", groupController.removeNoteFromGroup);
router.get("/group", groupController.getAllGroups);
router.post("/group", groupController.createGroup);

router.get("/moderate/group/:id", groupController.getPendingMembers);
router.put("/moderate/group/:id/acceptMembers", groupController.acceptPendingMembers);
router.put("/moderate/group/:id/admin", groupController.promoteMemberToAdmin);
router.delete("/moderate/group/:id/admin", groupController.demoteAdminToMember);
router.delete("/moderate/group/:id/member", groupController.removeMember);
router.delete("/moderate/group/:id", groupController.deleteGroup);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Citation routes */

router.put("/citation/:id", citationController.updateCitation);
router.delete("/citation/:id", citationController.deleteCitation);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */



module.exports = router;
