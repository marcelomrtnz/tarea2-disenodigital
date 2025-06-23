const yup = require("yup")

const productoSchema = yup.object({
  nombre: yup.string().required("El nombre es obligatorio"),
  precio: yup
    .number()
    .typeError("El precio debe ser un número")
    .positive("El precio debe ser mayor a cero")
    .required("El precio es obligatorio"),
  descripcion: yup
    .string()
    .required("La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  disponible: yup
    .boolean()
    .typeError("Disponible debe ser booleano")
    .required("El campo disponible es obligatorio"),
});

module.exports = productoSchema