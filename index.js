const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./src/config/database')
require('dotenv').config()

const port = process.env.PORT

// Crear el server
const app = express()

// Base de datos
dbConnection()

// Cors
app.use(cors())

app.use(express.json())

// Directorio publico
app.use(express.static('public'))

// Rutas
app.use('/api/auth', require('./src/routes/auth'))
app.use('/api/events', require('./src/routes/events'))

// Para que funcione el frontend en la carpeta public
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

// Escuchar peticiones
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
