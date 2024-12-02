const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/db_connection");
const Faq = sequelize.define("Faq", {
    qst: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
module.exports = { Faq };
