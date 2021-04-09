const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../helper/connection');
const Movie = require("./movie");
const Schedule = sequelize.define('Schedule', {
    Id: {
        type: DataTypes.INTEGER,
        field: 'Id',
        primaryKey: true,
        autoIncrement: true
    },
    Screen: {
        type: DataTypes.INTEGER,
        field: 'Screen'
    },
    Time: {
        type: DataTypes.TIME,
        field: 'Time'
    }
}, {
    tableName: 'schedule',
    timestamps: false
});

Movie.hasOne(Schedule);
Schedule.belongsTo(Movie)

module.exports = Schedule;