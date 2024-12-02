const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const faq = sequelize.define("faq", {
    qst: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
module.exports = { faq };
