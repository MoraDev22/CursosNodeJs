const express = require('express')

const router = express.Router(); //Nos provee la gestion de rutas

const profesoresController = require('./../controllers/profesoresCotroller.js');
const { ValidateProfessorData } = require('../Middlewares/ValidateData.js');

router.post('/', ValidateProfessorData, profesoresController.insertProfessor);
router.get('/', profesoresController.consultProfessors);

//router.route devuelve un objeto de tipo Route (Ruta lista para asignarle métodos HTTP)
router.route("/:id")
    .get(profesoresController.consultProfessor)
    .put(profesoresController.updateProfessor)
    .delete(profesoresController.deleteProfessor)

module.exports = router;