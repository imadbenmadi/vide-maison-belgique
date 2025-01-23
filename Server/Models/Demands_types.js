const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const Demands_types = sequelize.define("Demands_types", {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = { Demands_types };
