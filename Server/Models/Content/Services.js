const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db_connection");

const Services = sequelize.define("Services", {
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = { Services };
