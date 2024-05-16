const controller = {};

controller.login = (req, res) => {
    const { nombre, contrasena } = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }

        // Verificar si es un profesor
        conn.query('SELECT * FROM profesores WHERE nombre = ? AND contrasena = ?', [nombre, contrasena], (err, profesores) => {
            if (err) {
                res.json(err);
            }
            if (profesores.length > 0) {
                // Si es un profesor, mostrar mensaje en consola
                req.session.userId = profesores[0].id;
                console.log('Ingresó un profesor');
                res.redirect('/inicioProfesor');
            } else {
                // Si no es un profesor, verificar si es un estudiante
                conn.query('SELECT * FROM estudiantes WHERE nombre = ? AND contrasena = ?', [nombre, contrasena], (err, estudiantes) => {
                    if (err) {
                        res.json(err);
                    }
                    if (estudiantes.length > 0) {
                        // Si es un estudiante, mostrar mensaje en consola
                        req.session.userId = estudiantes[0].id;
                        console.log('Ingresó un estudiante');
                        res.redirect('/inicioEstudiante');
                    } else {
                        // Si no se encuentra en ninguna tabla, mostrar mensaje de error
                        res.send('Usuario no encontrado');
                    }
                });
            }
        });
    });
};

module.exports = controller