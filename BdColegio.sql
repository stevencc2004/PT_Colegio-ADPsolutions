#drop database Colegio;

create database Colegio;

use Colegio;

CREATE TABLE Profesores (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Estudiantes (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Materias (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE Profesor_Materia (
    id INT NOT NULL AUTO_INCREMENT,
    id_profesor INT NOT NULL,
    id_materia INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_profesor) REFERENCES Profesores(id),
    FOREIGN KEY (id_materia) REFERENCES Materias(id)
);

CREATE TABLE Estudiante_Materia (
    id INT NOT NULL AUTO_INCREMENT,
    id_estudiante INT NOT NULL,
    id_materia INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_estudiante) REFERENCES Estudiantes(id),
    FOREIGN KEY (id_materia) REFERENCES Materias(id)
);

INSERT INTO Profesores (id, nombre, correo, contrasena) VALUES
(1, 'Juan Pérez', 'juan@example.com', '123456'),
(2, 'María López', 'maria@example.com', '654321');

INSERT INTO Estudiantes (id, nombre, correo, contrasena) VALUES
(1, 'Carlos Rodríguez', 'carlos@example.com', '789'),
(2, 'Ana Gómez', 'ana@example.com', '987');