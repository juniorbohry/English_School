const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const Person = require('./Person')
const Classenglish = require('./Classenglish')


const Enrollment = db.define('Enrollment', {
    made_by: {
        type: DataTypes.STRING,
        required: true
    },
});

Person.hasMany(Enrollment)
Enrollment.belongsTo(Person)

Classenglish.hasMany(Enrollment)
Enrollment.belongsTo(Classenglish)

module.exports = Enrollment;