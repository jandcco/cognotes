const CreateCitation = require("../../database/Actions/CreateCitation");
const DeleteCitation = require("../../database/Actions/DeleteCitation");
const UpdateCitation = require("../../database/Actions/UpdateCitation");
const GetCitation = require("../../database/Actions/GetCitation");

/**
 * Creates a citation for a note
 * @param  {object}  req has body keys noteId, url, caption, publication
 * @param  {object}  res
 * @return {Promise}
 */
const createCitation = async (req, res) => {
  const noteId = req.params.id;
  const { url, caption, publication } = req.body;
  try {
    let citation = await CreateCitation(noteId, url, caption, publication);
    res.status(200).send(citation);
  } catch (e) {
    throw e;
  }
};

/**
 * deletes a given citation.
 * @param  {object}  req needs :id in params (citation id)
 * @param  {object}  res
 * @return {Promise}
 */
const deleteCitation = async (req, res) => {
  const citationId = req.params.id;
  try {
    await DeleteCitation(citationId);
    res.status(200);
  } catch (e) {
    throw e;
  }
};

/**
 * Updates the url and/or the caption and/or the publication of
 * the given citation (:id in req params).
 * @param  {object}  req body should contain at least one key of: url, caption, publication
 * @param  {object}  res [description]
 * @return {Promise}     [description]
 */
const updateCitation = async (req, res) => {
  const citationId = req.params.id;
  let {url, caption, publication} = req.body;
  try {
    const citation = await GetCitation(citationId);
    if (!url) url = citation.url;
    if (!caption) caption = citation.caption;
    if (!publication) publication = citation.publication;
    let updatedCitation = await UpdateCitation(citation, url, caption, publication);
    res.status(200).send(updatedCitation);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createCitation,
  deleteCitation,
  updateCitation
};
