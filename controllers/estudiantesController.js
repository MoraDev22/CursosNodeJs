const db = require('../db/connection.js');
class EstudiantesController {

    constructor(){}

    async consultStudent(req,res){
        try{
            const { id } = req.params;
            const [rows] = await db.query(
                `SELECT * FROM students WHERE idStudent = ?;`, [id]
            );

            if(rows.length === 0){
                return res.status(404).json({message: `No existe el alumno con id: ${id} en la base de datos`});
            }

            return res.status(200).json({
                message : "Alumno encontrado",
                data: rows
            });

        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async consultStudents(req,res){
        try{
            const [rows] = await db.query(
                `SELECT * FROM students;`
            );

            if(rows.length == 0){
                return res.status(404).json({message: "No existen alumnos registrados en la base de datos"});
            }

            return res.status(200).json(rows);

        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    
    async insertStudent(req,res){
        try{
            const { dni, name, surname, email } = req.body;
            const [data] = await db.query(
                `INSERT INTO cursos.students 
                    (idStudent, dni, name, surname, email)
                        VALUES (NULL, ?, ?, ?, ?);`,[dni, name, surname, email]
            );

            return res.status(201).json(
                {
                    message: "Alumno registrado exitosamente",
                    id: data.insertId
                });

        } catch(err){
            res.status(500).json(
                {
                    header: "No se pudo ingresar el estudiante en la base de datos",
                    message: err.message
                }
            );
        }
    }

    async updateStudent(req,res){
        try{
            const { id } = req.params;
            const { dni, name, surname, email } = req.body;
            const [data] = await db.query( 
                `UPDATE students
                    SET dni = ?, name = ?, surname = ?, email = ? WHERE idStudent = ?;`,
                    [ dni, name, surname, email, id ]); 
            
            if (data.affectedRows == 0) return res.status(404).json({message: `No existe el estudiante con id ${id}`});
            
            return res.status(201).json({message: "Datos del alumno actualizado correctamente"});
        } catch(err) {
            res.status(500).send(err.message);
        }
    }

    async deleteStudent(req,res){
        try{
            const { id } = req.params;
            const [data] = await db.query( 
                `DELETE FROM students WHERE idStudent = ?`, [ id ]
            );

            if(data.affectedRows == 0) return res.status(404).json({message: `No existe el alumno con id ${id}`});
            
            return res.status(200).json({message: "Alumno eliminado correctamente"});
        } catch(err) {
            res.status(500).send(err.message);
        }
    }
}


module.exports = new EstudiantesController();