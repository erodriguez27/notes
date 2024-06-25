const { Category: categoryModel } = require("../models/category.model");
const { Note: noteModel } = require("../models/note.model");

/**
 * find all the categories on the database
 * @returns array with the found categories
 */
const findCategories = () => categoryModel.findAll();

/**
 * find the provided category in case it doesn't exist creates it
 * @param categoryName name of the category to find/create. Name is a unique constrain on the table
 * @returns array containing the category
 */
const findOrCreateCategory = async (categoryName) =>
  categoryModel.findOrCreate({
    where: { name: categoryName },
    defaults: {
      name: categoryName,
    },
  });

/**
 * find category's notes
 * @param categoryId string, id of the category
 * @returns results of the operation 1 success, 0 failure
 */
const getNotesFromCategory = async (categoryId, archived = false) =>
  categoryModel.findAll({
    include: {
      model: noteModel,
      as: "notes",
      include:{
        model: categoryModel,
        as: "categories"
      },
      where: {archived: archived}
    },
    where: {
      id: categoryId,
    },
  });

module.exports = {
  findCategories,
  findOrCreateCategory,
  getNotesFromCategory,
};
