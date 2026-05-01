const express = require('express');
const cors = require('cors');
const app = express(); //Retorna una instancia de la aplicación express
const studentsRoutes = require('./routes/estudiantesRoutes.js')
const professorsRoutes = require('./routes/profesoresRoutes.js');
const coursesRoutes = require('./routes/cursosRoutes.js');

app.use(express.json());
app.use(cors());

//Respondemos a los verbos de una API REST (GET,POST,PUT, etc....)
//* Middeware de tipo ruta
// req: Obtenemos la información recibida en la petición
// res: Nos permite devolver una respuesta a la petición
app.get('/', (req, res) => {
    res.send('Hola Mundo'); 
}); 

app.use('/estudiantes', studentsRoutes);
app.use('/profesores', professorsRoutes);
app.use('/cursos', coursesRoutes);

//Hacemos que se la pase escuchando
app.listen(3000, () => {
    console.log('Servidor Activo...') //No responde nada, solo escucha
});