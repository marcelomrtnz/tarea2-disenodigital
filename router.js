const express = require('express')
const router = express.Router()

const {
  getAll,
  getAvailable,
  getById,
  createProducto,
  updateProducto,
  deleteProducto
} = require('./controller')

// GET /productos - ver todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await getAll()
    res.json(productos)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// GET /productos/disponibles - ver productos disponibles
router.get('/disponibles', async (req, res) => {
  try {
    const disponibles = await getAvailable()
    res.json(disponibles)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// GET /productos/:id - otener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await getById(req.params.id)
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.json(producto)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// POST /productos - crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const nuevo = await createProducto(req.body)
    res.status(201).json(nuevo)
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errores: err.errors })
    }
    console.error(err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// PUT /productos/:id - actualizar un producto existente
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await updateProducto(req.params.id, req.body)
    if (!actualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.json(actualizado)
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errores: err.errors })
    }
    console.error(err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// DELETE /productos/:id - eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const borrado = await deleteProducto(req.params.id)
    if (!borrado) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

module.exports = router
