const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Level = db.define('Level', {
    description_level: {
        type: DataTypes.STRING,
        required: true
    },
});

module.exports = Level