const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db_connection");
const { Company } = require("./Company");

const About_page = sequelize.define("About_page", {
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
    button: {
        type: DataTypes.STRING,
        allowNull: true,
        link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
});

module.exports = { About_page };
