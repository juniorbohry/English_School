const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('escola_ingles_02', 'root', '123321', {
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