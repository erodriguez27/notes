const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");

module.exports = function () {
  router.get("/", (req, res) => noteController.getNotes(req, res));
  router.post("/", (req, res) => noteController.createNote(req, res));
  router.put("/:noteId", (req, res) => noteController.editNote(req, res));
  router.delete("/:noteId", (req, res) => noteController.deleteNote(req, res));
  router.put("/:noteId/archived", (req, res) =>
    noteController.archivedNote(req, res)
  );
  router.put("/:noteId/category", (req, res) =>
    noteController.addCategoryToNote(req, res)
  );

  return router;
};
