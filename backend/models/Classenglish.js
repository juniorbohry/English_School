const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const Person = require('./Person')
const Level = require('./Level')

const Classenglish = db.define('Classenglish', {
    name_class: {
        type: DataTypes.STRING,
        required: true
    },
});

Person.hasMany(Classenglish, {
    //to restrict the "delete" method
    onDelete: 'restrict'
})
Classenglish.belongsTo(Person)

Level.hasMany(Classenglish, {
    //to restrict the "delete" method
    onDelete: 'restrict'
})
Classenglish.belongsTo(Level)

module.exports = Classenglish;