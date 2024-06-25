const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");
const categoryController = require("../controllers/category.controller");

module.exports = function () {
  router.get("/", (req, res) => categoryController.getCategories(req, res));
  router.post("/", (req, res) =>
    categoryController.addCategoryToNote(req, res)
  );
  router.get("/:categoryId", (req, res) =>
    categoryController.getNotesFromCategory(req, res)
  );
  router.delete("/:categoryId/:noteId", (req, res) =>
    categoryController.removeNoteFromCategory(req, res)
  );

  return router;
};
