const express = require('express')

// Crear el server
const app = express()
const port = 4000

app.get('/', (req, res) => {
  return res.json({ message: 'Hola' })
})





// Escuchar peticiones
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
