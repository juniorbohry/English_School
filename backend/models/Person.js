const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Person = db.define('Person', {
    name: {
        type: DataTypes.STRING,
        required: true,
    },

    email: {
        type: DataTypes.STRING,
        required: true,
    },

    age: {
        type: DataTypes.INTEGER,
        required: true,
    },

    teachingstaff: {
        type: DataTypes.BOOLEAN,
        required: true,
    },
})

module.exports = Person