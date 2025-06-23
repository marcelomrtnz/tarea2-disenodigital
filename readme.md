# API de Productos

Proyecto API REST para gestionar un listado de productos usando Express y LowDB.

## Requisitos

* Node.js v14+
* npm

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/marcelomrtnz/tarea2-disenodigital
   cd tarea2-disenodigital
   ```
2. Instalar dependencias:

   ```bash
   npm install
   ```

## Archivos principales

* `index.js` : Arranca el servidor e inicializa la base de datos.
* `model.js` : Esquema de validaciones con Yup.
* `router.js` : Rutas de la API de productos.
* `controller.js` : Controlador de la información de productos.
* `db.json` : Archivo JSON que hace de base de datos.

## Uso

1. Arrancar el servidor:

   ```bash
   node index.js
   ```
2. Hacer peticiones a `http://localhost:3000/productos`

Rutas disponibles:

| Método | Ruta                     | Descripción                |
| ------ | ------------------------ | -------------------------- |
| GET    | `/productos`             | Lista todos los productos  |
| GET    | `/productos/disponibles` | Lista solo los disponibles |
| GET    | `/productos/:id`         | Obtiene producto por ID    |
| POST   | `/productos`             | Crea un producto           |
| PUT    | `/productos/:id`         | Actualiza un producto      |
| DELETE | `/productos/:id`         | Elimina un producto        |

## Validaciones

* `nombre`: obligatorio
* `precio`: número > 0
* `descripcion`: mínimo 10 caracteres
* `disponible`: booleano

En caso de error de validación la API responde con **400** y un objeto `{ errores: [...] }`.

## Manejo de errores

* **404** si no existe el recurso.
* **500** para errores internos.
