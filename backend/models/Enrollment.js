const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const Person = require('./Person')
const Classenglish = require('./Classenglish')


const Enrollment = db.define('Enrollment', {
    made_by: {
        type: DataTypes.STRING,
        required: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        required: true,
    },
});

Person.hasMany(Enrollment, {
    //to restrict the "delete" method
    onDelete: 'restrict'
})
Enrollment.belongsTo(Person)

Classenglish.hasMany(Enrollment)
Enrollment.belongsTo(Classenglish)

module.exports = Enrollment;