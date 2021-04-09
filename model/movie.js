const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../helper/connection');
const Movie = sequelize.define('Movie', {
    Id: {
        type: DataTypes.INTEGER,
        field: 'Id',
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.TEXT,
        field: 'Name',
    },
    Director: {
        type: DataTypes.TEXT,
        field: 'Director'
    },
    Release: {
        type: DataTypes.DATE,
        field: 'Release'
    },
    Duration: {
        type: DataTypes.INTEGER,
        field: 'Duration'
    },
    ImageSource: {
        type: DataTypes.TEXT,
        field: 'ImageSource'
    }
}, {
    tableName: 'movie',
    timestamps: false
});

module.exports = Movie;