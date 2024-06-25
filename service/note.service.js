const { Note: noteModel } = require("../models/note.model");
const {Category: categoryModel } = require("../models/category.model");

const createNote = (content) => noteModel.create({ content });

const getNotes = (archived) =>
  noteModel.findAll({
    include: {
      model: categoryModel,
      as: "categories",
    },
    where: {
      archived: archived === "true",
    },
  });

const getNoteById = (noteId) => noteModel.findByPk(noteId);

const editNote = async (noteId, content) => {
  const note = await noteModel.findOne({ where: { id: noteId } });
  if (!note) throw new Error("note not found");
  note.update({ content });
  return note;
};

const deleteNote = (noteId) =>
  noteModel.destroy({
    where: {
      id: noteId,
    },
  });

const handleArchivedNote = async (noteId) => {
  const note = await getNoteById(noteId);
  if (!note) {
    throw new Error("note not found");
  }

  await note.update({ archived: !note.archived });
  return note;
};

module.exports = {
  createNote,
  deleteNote,
  editNote,
  getNotes,
  getNoteById,
  handleArchivedNote,
};
