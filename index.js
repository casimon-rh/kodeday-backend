const express = require('express')
const app = express()
const port = 3000

// Middleware
app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(express.json())

// Controlers
app.get('/', (req, res) =>
  res.status(200).send({ message: 'hola mundo' })
)
require('./controllers/dog')(app)

app.set('port', port)

app.listen(port, () => console.log('Corriendo 🏃‍♂️'))
