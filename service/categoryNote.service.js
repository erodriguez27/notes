const {
  CategoryNote: categoryNoteModel,
} = require("../models/categoryNote.model");

/**
 * creates the relationship register between note and category, uses a findOrCreate to avoid inserting a record already inserted
 * @param noteId string, id of the note
 * @param categoryId string, id of the category
 * @returns Object representing the relationship between both tables
 */
const findOrCreate = async (noteId, categoryId) =>
  categoryNoteModel.findOrCreate({
    where: { noteId, categoryId },
    defaults: {
      noteId,
      categoryId,
    },
  });

/**
 * removes the relationship register between note and category from the database
 * @param noteId string, id of the note
 * @param categoryId string, id of the category
 * @returns results of the operation 1 success, 0 failure
 */
const removeRelationship = async (noteId, categoryId) =>
  categoryNoteModel.destroy({
    where: {
      noteId,
      categoryId,
    },
  });

module.exports = {
  findOrCreate,
  removeRelationship,
};
