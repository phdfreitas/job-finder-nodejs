const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

router.get('/test', (req, res) => {
    res.send('Ok')
})

router.post('/newJob', (request, response) => {

    let {title, salary, company, job_description, email, status} = request.body;

    Job.create({
        title, 
        salary,
        company, 
        email, 
        status, 
        job_description
    })
    .then(() => response.redirect('/'))
    .catch(err => console.log(err))

})

module.exports = router