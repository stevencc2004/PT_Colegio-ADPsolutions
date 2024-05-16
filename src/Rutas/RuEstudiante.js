const express = require('express');
const router = express.Router();

const EstudianteController = require('../Controladores/EstudianteController');

// Ruta para listar estudiantes
router.get('/Estudiante', EstudianteController.listar);

// Ruta para mostrar formulario de creación de estudiante
router.get('/Estudiante/crear', (req, res) => {
    res.render('crearEstudiante');
});

// Ruta para procesar el formulario de creación de estudiante
router.post('/Estudiante/crear', EstudianteController.crear);

// Ruta para mostrar formulario de edición de estudiante
router.get('/Estudiante/editar/:id', (req, res) => {
    const { id } = req.params;
    res.render('editarEstudiante', { id });
});

// Ruta para procesar el formulario de edición de estudiante
router.post('/Estudiante/editar/:id', EstudianteController.editar);

// Ruta para mostrar confirmación de eliminación de estudiante
router.get('/Estudiante/eliminar/:id', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM estudiantes WHERE id = ?', [id], (err, result) => {
            if (err) {
                res.json(err);
            }
            // Verificamos si result tiene algún resultado
            if (result && result.length > 0) {
                const estudiante = result[0];
                res.render('eliminarEstudiante', { estudiante });
            } else {
                // Si no se encuentra el estudiante, redirigir a la página principal o mostrar un mensaje de error
                res.redirect('/');
            }
        });
    });
});

// Ruta para eliminar un estudiante
router.post('/Estudiante/eliminar/:id', EstudianteController.eliminar);

// Ruta para mostrar la lista de estudiantes por materia
router.get('/estudiantesPorMateria', EstudianteController.listaEstudiantesPorMateria);

module.exports = router;