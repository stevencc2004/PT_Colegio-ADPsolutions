const express = require('express');
const router = express.Router();
const MateriaController = require('../Controladores/MateriaController');

// Ruta para listar materias
router.get('/Materias', MateriaController.listar);

// Ruta para mostrar formulario de creación de materia
router.get('/Materias/crearM', (req, res) => {
    res.render('crearMateria');
});

// Ruta para procesar formulario de creación de materia
router.post('/Materias/crearM', MateriaController.crear);

// Ruta para mostrar formulario de edición de materia
router.get('/Materias/editarM/:id', (req, res) => {
    const { id } = req.params;
    res.render('editarMateria', { id });
});

// Ruta para procesar formulario de edición de materia
router.post('/Materias/editarM/:id', MateriaController.editar);

// Ruta para eliminar materia
router.get('/Materias/eliminarM/:id', MateriaController.eliminar);

// Ruta para mostrar la lista de materias por estudiante
router.get('/MateriasPorEs', MateriaController.listaMateriasPorEstudiante);

// Ruta para mostrar la lista de materias no vistas por el estudiante
router.get('/estudiantes/materias/novistas', MateriaController.listaMateriasNoVistas);

// Ruta para agregar una materia al estudiante
router.post('/estudiantes/materias/agregar', MateriaController.agregarMateria);

module.exports = router;