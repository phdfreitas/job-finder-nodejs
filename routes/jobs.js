const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

router.get('/newJob', (req, res) => {
    res.render('add')
})

router.get('/view/:id', (req, res) => {
    Job.findOne({
        where: {id: req.params.id}
    })
    .then(job => {
        res.render('view', {
            job
        })
    })
    .catch(err => console.log(err))
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