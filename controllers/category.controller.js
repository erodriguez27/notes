const categoryService = require("../service/category.service");
const noteService = require("../service/note.service");
const categoryNoteService = require("../service/categoryNote.service");

/**
 * Handles the creation of relationship between note and category
 * @param body.noteId string representing the primary key of the note we are adding the category to
 * @param body.categoryName string representing the name of the category we are adding to the note. Name is an unique constrain in the category table
 * @returns status 200 if the relationship is successfully created, 500 if fails to be created
 */
const addCategoryToNote = async (req, res) => {
  const { noteId, categoryName } = req.body;
  const note = noteService.getNoteById(noteId);

  if (!note) {
    return res.sendStatus(404);
  }

  const [category] = await categoryService.findOrCreateCategory(categoryName);
  try {
    await categoryNoteService.findOrCreate(noteId, category.id);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
};

/**
 * Get all the categories on the database
 * @returns status 200 with results array in case any tag was found; else returns 204
 */
const getCategories = async (req, res) => {
  const categoryList = await categoryService.findCategories();

  if (!categoryList?.length) {
    return res.sendStatus(204);
  }

  return res.status(200).json({ results: categoryList });
};

/**
 * Get all the categories on the database
 * @returns status 200 with results array in case any note was found; else returns 204
 */
const getNotesFromCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { archived } = req.query;
  const noteCategoryList = await categoryService.getNotesFromCategory(
    categoryId, archived === 'true'
  );

  if (!noteCategoryList?.length || !noteCategoryList[0].notes?.length) {
    return res.sendStatus(204);
  }

  return res.status(200).json({ results: noteCategoryList[0].notes });
};

/**
 * deletes the relationship between a category and a note.
 * @param params.noteId string representing the primary key of the note we are removing.
 * @param body.categoryName string representing the name of the category we are removing a note to.
 * @returns status 200 if the note was successfully removed, 404 if the note doesn't exists, 500 if there was an error.
 */
const removeNoteFromCategory = async (req, res) => {
  const { categoryId, noteId } = req.params;
  const destroyed = await categoryNoteService.removeRelationship(
    noteId,
    categoryId
  );

  if (destroyed) {
    return res.sendStatus(200);
  }
  return res.sendStatus(400);
};

module.exports = {
  addCategoryToNote,
  getCategories,
  getNotesFromCategory,
  removeNoteFromCategory,
};
