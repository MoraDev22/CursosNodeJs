const express = require('express')

const router = express.Router(); //Nos provee la gestion de rutas
const cursosController = require('../controllers/cursosController.js');
const { ValidateCourseData} = require('../Middlewares/ValidateData.js');

router.post('/', ValidateCourseData ,cursosController.insertCourse);
router.get('/', cursosController.consultCourses);
router.post('/asociarEstudiante', cursosController.associateStudent);

//router.route devuelve un objeto de tipo Route (Ruta lista para asignarle métodos HTTP)
router.route("/:id")
    .get(cursosController.consultCourse)
    
    .put(cursosController.updateCourse)
    
    .delete(cursosController.deleteCourse)

module.exports = router;