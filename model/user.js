const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../helper/connection');
const User = sequelize.define('User', {
    Id: {
        type: DataTypes.INTEGER,
        field: 'Id',
        primaryKey: true,
        autoIncrement: true
    },
    Username: {
        type: DataTypes.TEXT,
        field: 'Username',
    },
    Email: {
        type: DataTypes.TEXT,
        field: 'Email'
    },
    Password: {
        type: DataTypes.TEXT,
        field: 'Password'
    },
    Phone: {
        type: DataTypes.TEXT,
        field: 'Phone'
    }
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = User;