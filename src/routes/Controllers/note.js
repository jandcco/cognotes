const CreateNote = require("../../database/Actions/CreateNote");
const GetNote = require("../../database/Actions/GetNote");
const GetNotes = require("../../database/Actions/GetNotes");
const DeleteNote = require("../../database/Actions/DeleteNote");
const UpdateNote = require("../../database/Actions/UpdateNote");
const GetNoteCitations = require("../../database/Actions/GetNoteCitations");

/**
 * If :id parameter provided, gets that one note, otherwise gets all notes.
 * @param  {object}  req
 * @param  {object}  res
 * @return {Promise}
 */
const getNotes = async (req, res) => {
  if(req.params.id) {
    const note = await GetNote(req.params.id);
    res.status(200).send(note);
  } else {
    const notes = await GetNotes();
    res.status(200).send(notes);
  }
};

/**
 * [createNote description]
 * @param  {object} req has keys in body: text and title
 * @param  {object} res [description]
 * @return {undefined}
 */
const createNote = async (req, res) => {
  const {text, title}  = req.body;
  //TODO: check that below is the right structure once we implement passport authentication
  //TODO: REMOVE THE OR (temp use for testing before implementing passport)
  const userId = req.session.passport.id || "5ac50c92b4cfe6637add94c6";
  try {
    const note = await CreateNote(userId, text, title);
    res.status(200).send(note);
  } catch (e) {
    throw e;
  }
};

/**
 * [deleteNote description]
 * @param  {object}  req has parameter :id
 * @param  {object}  res [description]
 * @return {undefined}     [description]
 */
const deleteNote = async (req, res) => {
  const userId = req.session.passport.id;
  const noteId = req.params.id;
  const note = await GetNote(noteId);
  if (note.owner === userId) {
    await DeleteNote(noteId);
    res.status(200);
  } else {
    res.status(403);
  }
};
/**
 * [updateNote description]
 * @param  {object}  req has keys in body: noteId and updatedText
 * @param  {object}  res [description]
 * @return {undefined}     [description]
 */
const updateNote = async (req, res) => {
  const userId = req.session.passport.id;
  const noteId = req.params.id
  const {updatedText} = req.body;
  const note = await GetNote(noteId);
  if (note.owner === userId) {
    const updated = await UpdateNote(noteId, updatedText);
    res.status(200).send(updated);
  } else {
    res.status(403);
  }
};

/**
 * Gets all citation for given note.
 * @param  {object}  req expects :id (of note) as req param.
 * @param  {object}  res
 * @return {Promise}
 */
const getNoteCitations = async (req, res) => {
  const noteId = req.params.id;
  try {
    let citations = await GetNoteCitations(noteId);
    res.status(200).send(citations);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
  getNoteCitations
};
