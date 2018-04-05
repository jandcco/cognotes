const CreateTag = require("../../database/Actions/CreateTag");
const DeleteTag = require("../../database/Actions/DeleteTag");
const GetTags = require("../../database/Actions/GetTags");
const GetNote = require("../../database/Actions/GetNote");
const GetTag = require("../../database/Actions/GetTag");

/**
 * gets all tags
 * @param  {object}  req [description]
 * @param  {object}  res [description]
 * @return {Promise}     [description]
 */
const getTags = async (req, res) => {
  try{
    const tags = await GetTags();
    res.status(200).send(tags);
  } catch (e) {
    throw e;
  }
};
/**
 * Only superusers can delete tags.
 * @param  {object}  req has :id tag id in params
 * @param  {object}  res
 * @return {Promise}
 */
const deleteTag = async (req, res) => {
  try {
    await DeleteTag(req.params.id);
    res.status(200);
  } catch (e) {
    throw e;
  }
};
/**
 * With a note id and tag text, adds a tag to note
 * only note owner can add a tag.
 * @param  {object}  req has body keys noteId and tagText
 * @param  {object}  res
 * @return {Promise}
 */
const addTagToNote = async (req, res) => {
  const noteId = req.params.id;
  const { tagText } = req.body;
  const userId = req.session.passport.id;
  try {
    let note = await GetNote(noteId);
    if (note.owner !== userId) return res.status(403);
    let tag = await CreateTag(tagText, noteId);
    note.addTag(tag._id);
    res.status(200).send(tag);
  } catch (e) {
    throw e;
  }
};

/**
 * With a note id and tag text, removes a tag from note
 * only note owner can remove a tag.
 * @param  {object}  req has body keys noteId and tagText
 * @param  {object}  res
 * @return {Promise}
 */
const removeTagFromNote = async (req, res) => {
  const { noteId, tagText } = req.params;
  const userId = req.session.passport.id;
  try {
    let note = await GetNote(noteId);
    if (note.owner !== userId) return res.status(403);
    let tag = await GetTag(tagText);
    note.removeTag(tag._id);
    tag.removeNote(noteId);
    res.status(200);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getTags,
  deleteTag,
  addTagToNote,
  removeTagFromNote
};
