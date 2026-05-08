const db = require('../db/connection');

class CursosController {

    constructor(){}

    async consultCourse(req,res){
        try{
            const { id } = req.params;
            const [rows] = await db.query(
                `SELECT * FROM course WHERE idCourse = ?;`, [id]
            );

            if(rows.length == 0){
                return res.status(404).json({message: `No existe el curso con id: ${id} en la base de datos`});
            }

            return res.status(201).json({
                message : "Curso encontrado",
                data: rows
            });

        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async consultCourses(req,res){
        try{
            const [rows] = await db.query(
                `SELECT * FROM course;`
            );

            if(rows.length == 0){
                return res.status(404).json({message: "No existen cursos registrados en la base de datos"});
            }

            return res.status(200).json(rows);

        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    
    async insertCourse (req,res){
        try{
            const { idProfessor, name, description } = req.body;

            const [result] = await db.query(
                        `INSERT INTO course 
                            (idProfessor, name, description)
                            VALUES (?, ?, ?);`,[idProfessor, name, description]);

            return res.status(201).json(
                {
                    message: "Curso insertado",
                    id: result.insertId
                }
            );

        } catch(err){

            if(err.code == "ER_NO_REFERENCED_ROW_2") return res.status(404).json(
                {
                    message: "El profesor no existe en la base de datos"
                }
            );

            if(err.code == "ER_DUP_ENTRY") return res.status(409).json({
                message: "Registro Duplicado. El registro con esos datos ya existen en la base de datos"
            });
            
            res.status(500).send(err.message);
        }
    }

     async associateStudent (req,res){
        try{
            const { idCourse, idStudent } = req.body;
            
            const [result] = await db.query(
                    `INSERT INTO student_course (idCourse, idStudent) VALUES (?, ?);`,[idCourse,idStudent]);
            
            
            return res.status(201).json(
                {
                    message: "Registro insertado correctamente en la base de datos",
                    id: result.insertId
                }
            );
        } catch(err){

            if(err.code === "ER_NO_REFERENCED_ROW_2"){
                return res.status(404).json(
                    {
                        message: "El curso o alumno no existen en la base de datos."
                    }
                );
            }

            if(err.code === "ER_DUP_ENTRY") return res.status(409).json({
                message: "Registro Duplicado. El registro con esos datos ya existen en la base de datos"
            });

            return res.status(500).send(err);
        }
    }

    async updateCourse(req,res){
        try{
            const { id } = req.params;
            const { idProfessor, name, description } = req.body;

            const [result] = await db.query( 
                `UPDATE course SET idProfessor = ?, name = ?, description = ? WHERE idCourse = ?;`,
                [ idProfessor, name, description, id ]);
                    
            if (result.affectedRows == 0) return res.status(404).json({message: `No existe el curso con id ${id} `});
            
            return res.status(201).json({message: "Curso actualizado correctamente"});

        } catch(err) {
            if(err.code === "ER_NO_REFERENCED_ROW_2"){
                return res.status(404).json(
                    {
                        message: `El profesor no existe en la tabla profesor`
                    }
                );
            }
            res.status(500).send(err.message);
        }
    }
    
    async deleteCourse(req,res){
        try{
            const { id } = req.params;
            const [data] = await db.query( 
                `DELETE FROM course WHERE idCourse = ?`, [ id ]
            );
            
            if (data.affectedRows == 0) return res.status(404).json({message: `No existe el curso con id ${id}`});

            return res.status(201).json({message: "Curso eliminado correctamente"});

        } catch(err) {
            res.status(500).send(err.message);
        }
    }
}


module.exports = new CursosController();