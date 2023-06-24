const express = require('express')
require('dotenv').config()

const port = process.env.PORT

// Crear el server
const app = express()

app.use(express.json())

// Directorio publico
app.use(express.static('public'))

// Rutas
app.use('/api/auth', require('./src/routes/auth'))

// Escuchar peticiones
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
