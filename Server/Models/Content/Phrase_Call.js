const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db_connection");

const Phrase_Call = sequelize.define("Main_page", {
    Text: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    button: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = { Phrase_Call };
