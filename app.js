const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
const db = require('./db/connection')
const bodyParser = require('body-parser')
const Job = require('./models/Job')

const Sequelize = require('sequelize')
const { query } = require('express')
const Op = Sequelize.Op

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`O express está rodando na porta ${PORT}.`)
})

app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))

//db connection
db.authenticate().then(() =>
    console.log('Conexão estabelecida.'))
    .catch(err => {
        console.log('Erro ao conectar com o banco', err)
    })

app.get('/', (request, response) => {
    
    let search = request.query.job
    let query = `%${search}%`

    if(!search){
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            response.render('index', {
                jobs
            })
        })
        .catch(err => console.log(err))
    }
    else{
        Job.findAll({
            where: {title: {[Op.like]: query}},
            order: [
            ['createdAt']
        ]})
        .then(jobs => {
            response.render('index', {
                jobs, search
            })
        })
        .catch(err => console.log(err))
    }
})

app.use('/jobs', require('./routes/jobs'))