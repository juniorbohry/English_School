const { Sequelize } = require('sequelize')
require('dotenv').config()
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

const sequelize = new Sequelize('escola_ingles_02', 'root', `${DB_PASSWORD}`, {
    host: 'localhost',
    dialect: 'mysql',
})

// try {
//     sequelize.authenticate()
//     console.log('Conectamos com o Sequelize!')
// } catch (error) {
//     console.error('Não foi possível conectar:', error)
// }


module.exports = sequelize