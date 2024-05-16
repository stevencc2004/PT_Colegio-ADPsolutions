const express = require('express');
const router = express.Router();
const LoginController = require('../Controladores/LoginController');

// Ruta para mostrar el formulario de login
router.get('/login', (req, res) => {
    res.render('login');
});

// Ruta para procesar el formulario de login
router.post('/login', LoginController.login);

// Ruta para el inicio del profesor
router.get('/inicioProfesor', (req, res) => {
    res.render('inicioPr');
});

// Ruta para el inicio del estudiante
router.get('/inicioEstudiante', (req, res) => {
    res.render('inicioEs');
});

module.exports = router;