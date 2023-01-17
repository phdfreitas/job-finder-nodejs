const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
const db = require('./db/connection')
const bodyParser = require('body-parser')

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
    response.render('index')
})

app.use('/jobs', require('./routes/jobs'))