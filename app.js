const express = require('express')
const app = express()
const db = require('./db/connection')
const bodyParser = require('body-parser')

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`O express está rodando na porta ${PORT}.`)
})

app.use(bodyParser.urlencoded({ extended: false }))

//db connection
db.authenticate().then(() =>
    console.log('Conexão estabelecida.'))
    .catch(err => {
        console.log('Erro ao conectar com o banco', err)
    })

app.get('/', (request, response) => {
    response.send('Hello world!')
})

app.use('/jobs', require('./routes/jobs'))