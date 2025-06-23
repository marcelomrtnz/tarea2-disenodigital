const express = require('express')
const app = express()

const { initDB } = require('./controller');

(async () => {
  try {
    await initDB();
    console.log('Base de datos inicializada')
  } catch (err) {
    console.error('Error al inicializar la base de datos:', err)
    process.exit(1)
  }

  // Middlewares
  app.use(express.json())

  // Rutas
  const productosRouter = require('./router')
  app.use('/productos', productosRouter)

  // Inicio del servidor
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  })
})();
