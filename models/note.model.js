const { DataTypes } = require("sequelize");

const { sequelize } = require("../clients/database");

const Note = sequelize.define(
  "Note",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {}
);

(async () => {
  await Note.sync();
})();

module.exports = { Note };
