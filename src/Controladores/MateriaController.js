const controller = {};

controller.listar = (req, res) => {
    const idProfesor = req.session.userId; // Obtener el ID del profesor desde la sesión
    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
            return;
        }
        // Consulta SQL para obtener las materias creadas por el profesor
        const query = `
            SELECT m.* 
            FROM materias m 
            INNER JOIN Profesor_Materia pm ON m.id = pm.id_materia 
            WHERE pm.id_profesor = ?`;
        
        conn.query(query, [idProfesor], (err, materias) => {
            if(err){
                res.json(err);
                return;
            }
            res.render('Materia', {
                data: materias
            });
        });
    });
};

controller.crear = (req, res) => {
    console.log('si encuentra la ruta post');
    const { nombre, descripcion } = req.body;
    const idProfesor = req.session.userId; // Obtener el ID del profesor desde la sesión
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO materias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], (err, result) => {
            if (err) {
                res.json(err);
            }
            // Obtener el ID de la materia recién creada
            const id_materia = result.insertId;
            // Asociar la materia con el profesor
            conn.query('INSERT INTO Profesor_Materia (id_profesor, id_materia) VALUES (?, ?)', [idProfesor, id_materia], (err, result) => {
                if (err) {
                    res.json(err);
                }
                res.redirect('/Materias');
            });
        });
    });
};

controller.editar = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE materias SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id], (err, result) => {
            if (err) {
                res.json(err);
            }

            console.log('Materia actualizada correctamente');
            res.redirect('/Materias');
        });
    });
};


controller.eliminar = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        // Eliminar la asociación de la materia con los profesores en la tabla Profesor_Materia
        conn.query('DELETE FROM Profesor_Materia WHERE id_materia = ?', [id], (err, result) => {
            if (err) {
                res.json(err);
            }
            // Luego de eliminar las asociaciones, eliminar la materia en sí
            conn.query('DELETE FROM materias WHERE id = ?', [id], (err, result) => {
                if (err) {
                    res.json(err);
                }
                res.redirect('/Materias');
            });
        });
    });
};
controller.listaMateriasPorEstudiante = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }

        // Obtener id del estudiante desde la sesión
        const id_Es = req.session.userId;

        // Obtener las materias del estudiante con información del profesor
        const query = 'SELECT EM.id_estudiante, E.nombre AS nombre_estudiante, M.id AS id_materia, M.nombre AS nombre_materia, M.descripcion, P.nombre AS nombre_profesor ' +
                      'FROM Estudiante_Materia EM ' +
                      'INNER JOIN Estudiantes E ON EM.id_estudiante = E.id ' +
                      'INNER JOIN Materias M ON EM.id_materia = M.id ' +
                      'INNER JOIN Profesor_Materia PM ON M.id = PM.id_materia ' +
                      'INNER JOIN Profesores P ON PM.id_profesor = P.id ' +
                      'WHERE EM.id_estudiante = ?';

        conn.query(query, [id_Es], (err, materiasPorEstudiante) => {
            if (err) {
                res.json(err);
            }

            res.render('materiasPorEstudiante', { materiasPorEstudiante });
        });
    });
};

controller.listaMateriasNoVistas = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }

        // Obtener id del estudiante desde la sesión
        const idEstudiante = req.session.userId;

        // Obtener las materias que el estudiante no ve actualmente
        const query = 'SELECT M.id AS id_materia, M.nombre AS nombre_materia, M.descripcion, P.nombre AS nombre_profesor ' +
            'FROM Materias M ' +
            'INNER JOIN Profesor_Materia PM ON M.id = PM.id_materia ' +
            'INNER JOIN Profesores P ON PM.id_profesor = P.id ' +
            'WHERE M.id NOT IN (SELECT id_materia FROM Estudiante_Materia WHERE id_estudiante = ?)';

        conn.query(query, [idEstudiante], (err, materiasNoVistas) => {
            if (err) {
                res.json(err);
            }

            res.render('materiasNoVistas', { materiasNoVistas, idEstudiante });
        });
    });
};

controller.agregarMateria = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }

        const idEstudiante = req.session.userId;
        const { idMateria } = req.body;

        // Agregar la materia al estudiante
        conn.query('INSERT INTO Estudiante_Materia (id_estudiante, id_materia) VALUES (?, ?)', [idEstudiante, idMateria], (err, result) => {
            if (err) {
                res.json(err);
            }

            res.redirect(`/MateriasPorEs`);
        });
    });
};

module.exports = controller;