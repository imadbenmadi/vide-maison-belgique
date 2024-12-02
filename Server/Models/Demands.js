const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Demands = sequelize.define("Demands", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
module.exports = { Demands };
