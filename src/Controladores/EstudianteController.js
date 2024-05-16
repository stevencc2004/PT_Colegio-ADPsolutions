const controller = {};

controller.listar = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM estudiantes', (err, estudiantes) => {
            if(err){
                res.json(err);
            }
            console.log(estudiantes);
            res.render('Estudiantes', {
                data: estudiantes
            });
        });
    });
};

controller.crear = (req, res) => {
    const { nombre, correo, contrasena } = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO estudiantes (nombre, correo, contrasena) VALUES (?, ?, ?)', [nombre, correo, contrasena], (err, result) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/Estudiante');
        });
    });
};

controller.editar = (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contrasena } = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE estudiantes SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?', [nombre, correo, contrasena, id], (err, result) => {
            if (err) {
                res.json(err);
            }

            console.log('Estudiante actualizado correctamente');
            res.redirect('/Estudiante');
        });
    });
};


controller.eliminar = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM estudiantes WHERE id = ?', [id], (err, result) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/Estudiante');
        });
    });
};

controller.listaEstudiantesPorMateria = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }

        // Obtén el ID del profesor desde la sesión
        const idProfesor = req.session.userId;

        // Obtener las materias dictadas por el profesor
        conn.query('SELECT id_materia FROM Profesor_Materia WHERE id_profesor = ?', [idProfesor], (err, result) => {
            if (err) {
                res.json(err);
            }

            const materias = result.map(row => row.id_materia);

            // Verificar si hay materias antes de ejecutar la consulta final
            if (materias.length > 0) {
                // Obtener la lista de estudiantes por materia
                const query = 'SELECT PM.id_materia, M.nombre AS nombre_materia, EM.id_estudiante, E.nombre AS nombre_estudiante ' +
                              'FROM Profesor_Materia PM ' +
                              'INNER JOIN Estudiante_Materia EM ON PM.id_materia = EM.id_materia ' +
                              'INNER JOIN Materias M ON PM.id_materia = M.id ' +
                              'INNER JOIN Estudiantes E ON EM.id_estudiante = E.id ' +
                              'WHERE PM.id_profesor = ? AND PM.id_materia IN (?)';

                conn.query(query, [idProfesor, materias], (err, estudiantesPorMateria) => {
                    if (err) {
                        res.json(err);
                    }

                    res.render('estudiantesPorMateria', { estudiantesPorMateria });
                });
            } else {
                // Si no hay materias, renderizar la vista con un arreglo vacío
                res.render('estudiantesPorMateria', { estudiantesPorMateria: [] });
            }
        });
    });
};

module.exports = controller