const noteService = require("../service/note.service");
const categoryService = require("../service/category.service");
const categoryNoteService = require("../service/categoryNote.service");

/**
 * Get list of notes in db. If not found returns 204
 * @param archived optional string ("true"|"false") when true the service will find only archived notes
 * @returns result object containing 'results', an array of notes
 */
const getNotes = async (req, res) => {
  const { archived } = req.query;
  const noteList = await noteService.getNotes(archived);

  if (!noteList?.length) {
    return res.sendStatus(204);
  }

  return res.status(200).json({ results: noteList });
};

/**
 * creates a note in the database
 * @param body.content string, if empty returns error 400
 * @returns result the note created
 */
const createNote = async (req, res) => {
  if (!req.body?.content) return res.sendStatus(400);

  const { content } = req.body;
  const createdNote = await noteService.createNote(content);

  if (!createdNote) return res.sendStatus(500);

  return res.status(200).json({ result: createdNote });
};

/**
 * edits a note in the database, if the note doesn't exists does nothing
 * @param body.content string, if empty returns error 400
 * @param params.noteId string representing the primary key of the note
 * @returns result object containing the note edited
 */
const editNote = async (req, res) => {
  if (!req.body?.content) return res.sendStatus(400);

  const { noteId } = req.params;
  const { content } = req.body;
  let edited;
  try {
    edited = await noteService.editNote(noteId, content);
  } catch (err) {
    return res.sendStatus(404);
  }

  return res.status(200).json({ result: edited });
};

/**
 * deletes a note
 * @param params.noteId string representing the primary key of the note
 * @returns status 200 if the note is deleted; status 400 if not was not deleted (the note didn't exist)
 */
const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const destroyed = await noteService.deleteNote(noteId);

  if (destroyed) {
    return res.sendStatus(200);
  }
  return res.sendStatus(400);
};

/**
 * Handles the process of archive unarchive a note
 * @param params.noteId string representing the primary key of the note to be archive/unarchived
 * @returns
 */
const archivedNote = async (req, res) => {
  const { noteId } = req.params;
  let archived;

  try {
    archived = await noteService.handleArchivedNote(noteId);
  } catch (err) {
    return res.sendStatus(404);
  }

  return res.status(200).json({ result: archived });
};

module.exports = {
  getNotes,
  createNote,
  editNote,
  deleteNote,
  archivedNote,
};
