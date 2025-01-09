const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db_connection");

const Main_page = sequelize.define("Main_page", {
    
    Text: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    button: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = { Main_page };
