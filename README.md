# PT_Colegio-ADPsolutions
Prueba tecnica

# Sistema de Gestión Educativa

Este proyecto es un sistema de gestión educativa desarrollado en Node.js, Express, MySQL y EJS. Permite gestionar estudiantes, profesores y materias, así como la asignación de materias a estudiantes y la visualización de información relacionada.

## Pre-requisitos
1. Tener instalado y configurado MySql Database.
2. Tener instalado y configurado Node.js.

## Configuración

1. Clona el repositorio: `git clone https://github.com/stevencc2004/PT_Colegio-ADPsolutions`
2. Instala las dependencias: `npm install`
3. Configura la base de datos 
4. Ejecuta el servidor: `npm start`

### Configuración de la Base de Datos

Para configurar la base de datos, asegúrate de tener instalado un servidor de base de datos compatible, como MySQL. A continuación, puedes modificar las siguientes configuraciones en el archivo `app.js` para adaptarlas a tu entorno:

- **Puerto:** El puerto en el que se ejecuta el servidor de la base de datos. Por defecto, MySQL usa el puerto `3306`.
- **Nombre de la Base de Datos:** El nombre de la base de datos que estás utilizando para el proyecto. En este caso, el nombre de la base de datos es `BdColegio`.
- **Host:** La dirección del servidor de la base de datos. 
- **Contraseña:** La contraseña de tu servidor de base de datos. En este caso, la contraseña se encuentra vacía.
const config = {
    server: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'BdColegio'
};


## Estructura del Proyecto

- `app.js`: Archivo principal de la aplicación.
- `BdColegio.sql`: Script de la base de datos.
- `package.json`: Archivo de configuración de npm.
- `package-lock.json`: Archivo de bloqueo de dependencias de npm.
- `Public/`: Archivos estáticos (CSS, imágenes, etc.).
- `src/`
  - `Controladores/`: Controladores de las diferentes entidades.
  - `Rutas/`: Rutas de la aplicación.
  - `Vistas/`: Vistas de la aplicación en EJS.
    
## Uso

La aplicación cuenta con las siguientes funcionalidades:

- Los profesores pueden iniciar sesión.
- Los estudiantes pueden iniciar sesión.
- El profesor puede crear materias que puede dictar
- El profesor puede crear estudiantes
- El estudiante puede seleccionar le profesor y materia para ver
- El profesor puede ver los estudiantes que tiene asignado

## Credenciales de Prueba:
- Profesores:
 - Juan Pérez: 123456
 - María López: 654321
- Estudiantes:
- Carlos Rodríguez: 789
- Ana Gómez: 987

## Créditos

Este proyecto fue desarrollado por Steven Cubillos.
