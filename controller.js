const { Low } = require("lowdb")
const { JSONFile } = require("lowdb/node")
const { nanoid } = require("nanoid")
const productoSchema = require("./model")

const adaptador = new JSONFile("db.json")
const db = new Low(adaptador)

async function initDB() {
  await db.read()
  db.data ||= { productos: [] }
}

async function validateProducto(data) {
  try {
    const validated = await productoSchema.validate(data, { abortEarly: false })
    return validated
  } catch (err) {
    throw err
  }
}

async function getAll() {
  await initDB()
  return db.data.productos
}

async function getAvailable() {
  await initDB()
  return db.data.productos.filter((p) => p.disponible)
}

async function getById(id) {
  await initDB()
  return db.data.productos.find((p) => p.id === id) || null
}

async function createProducto(data) {
  await initDB()
  // Validar
  const valid = await validateProducto(data)
  const newProduct = {
    id: nanoid(),
    ...valid,
    fecha_ingreso: new Date().toISOString(),
  }
  db.data.productos.push(newProduct)
  await db.write()
  return newProduct
}

async function updateProducto(id, data) {
  await initDB()
  // Validar
  const valid = await validateProducto(data)
  const index = db.data.productos.findIndex((p) => p.id === id)
  if (index === -1) return null
  db.data.productos[index] = {
    ...db.data.productos[index],
    ...valid,
  }
  await db.write()
  return db.data.productos[index]
}

async function deleteProducto(id) {
  await initDB()
  const index = db.data.productos.findIndex((p) => p.id === id)
  if (index === -1) return false
  db.data.productos.splice(index, 1)
  await db.write()
  return true
}

module.exports = {
  validateProducto,
  getAll,
  getAvailable,
  getById,
  createProducto,
  updateProducto,
  deleteProducto,
  initDB
}
