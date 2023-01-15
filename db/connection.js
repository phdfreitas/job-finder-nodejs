const Sequelize = require('sequelize')

const sequelize = new Sequelize('jobfinder', '', '', {
    dialect: 'mysql', 
    host: 'localhost'
})

module.exports = sequelize