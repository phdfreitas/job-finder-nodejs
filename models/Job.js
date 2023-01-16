const Sequelize = require('sequelize')
const db = require('../db/connection')

const Job = db.define('tb_jobs', {
    title: {
        type: Sequelize.STRING
    },
    salary: {
        type: Sequelize.FLOAT
    },
    company: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.CHAR
    },
    job_description: {
        type: Sequelize.STRING
    }
})

module.exports = Job