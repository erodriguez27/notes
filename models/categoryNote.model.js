const { DataTypes } = require("sequelize");

const { sequelize } = require("../clients/database");

const { Note } = require("./note.model");
const { Category } = require("./category.model");

const CategoryNote = sequelize.define(
  "CategoryNote",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    noteId: {
      type: DataTypes.INTEGER,
      references: {
        model: Note,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {}
);

Note.belongsToMany(Category, {
  through: CategoryNote,
  as: "categories",
  foreignKey: "noteId",
});
Category.belongsToMany(Note, {
  through: CategoryNote,
  as: "notes",
  foreignKey: "categoryId",
});

(async () => {
  await CategoryNote.sync();
})();

module.exports = { CategoryNote };
