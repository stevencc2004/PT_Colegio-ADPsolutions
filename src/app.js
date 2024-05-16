const express = require('express');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const session = require('express-session');
const app = express();

const RutasLogin = require('./Rutas/RuLogin'); 
const RutasEstudiante = require('./Rutas/RuEstudiante');
const RutasMaterias = require('./Rutas/RuMaterias')

// Configurar express-session
app.use(session({
    secret: 'a1b2c3d4e5f6', // Clave secreta para firmar la sesión
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Vistas'));

app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '', 
    port: 3306,
    database: 'colegio'
}, 'single'));

app.use(express.urlencoded({ extended: false }));

// Middleware para redirigir la ruta raíz a la página de login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Rutas
app.use('/', RutasLogin); 
app.use('/', RutasEstudiante);
app.use('/', RutasMaterias);

app.use(express.static(path.join(__dirname, 'Public')));

app.listen(3000, () => {
    console.log('Servidor cargado en el puerto 3000');
});

