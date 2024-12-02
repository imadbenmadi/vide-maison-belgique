const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Contact_informations = sequelize.define("Contact_informations", {
    link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
module.exports = { Contact_informations };
