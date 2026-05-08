const express = require('express')

const router = express.Router(); //Nos provee la gestion de rutas
const estudiantesController = require('../controllers/estudiantesController.js');
const { ValidateStudentData } = require('../Middlewares/ValidateData.js');

router.post('/', ValidateStudentData ,estudiantesController.insertStudent);
router.get('/', estudiantesController.consultStudents);

//router.route devuelve un objeto de tipo Route (Ruta lista para asignarle métodos HTTP)
router.route("/:id")
    .get(estudiantesController.consultStudent)
    
    .put(ValidateStudentData,estudiantesController.updateStudent)
    
    .delete(estudiantesController.deleteStudent)

module.exports = router;