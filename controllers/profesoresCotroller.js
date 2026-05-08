const db = require('./../db/connection.js');

class ProfessorsController{

    constructor(){};

    async consultProfessor(req,res){
        try{
            const { id } = req.params;
            const [rows] = await db.query(
                `SELECT * FROM professors WHERE idProfessor = ?;`, [id]
            );

            if(rows.length == 0) return res.status(404).json({message: `No existe el profesor con id: ${id} en la base de datos`});

            return res.status(200).json({
                message : "Profesor encontrado",
                data: rows
            });

        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async consultProfessors(req, res){
        try{
            const [rows] = await db.query(
                `SELECT * FROM professors;`
            );

            if(rows.length == 0){
                return res.status(404).json({message: "No existen profesores registrados en la base de datos"});
            }

            return res.status(200).json(rows);

        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async insertProfessor(req, res){
        try{
            const { dni, name, surname, email, profession } = req.body;
            const [data] = await db.query(
                `INSERT INTO cursos.professors 
                    (idProfessor, dni, name, surname, email, profession)
                        VALUES (NULL, ?, ?, ?, ?, ?);`,[ dni, name, surname, email, profession ]
            );

            return res.status(201).json(
                {
                    message: "Profesor registrado exitosamente",
                    id: data.insertId
                });
                
        } catch(err){
            res.status(500).json({
                header: "No se pudo registrar el profesor a la base de datos",
                message: err.message
            });
        }
    }

    async updateProfessor(req, res){
        try{
            const { id } = req.params;
            const { dni, name, surname, email, profession } = req.body;
            const [data] = await db.query( 
                `UPDATE professors
                    SET dni = ?, name = ?, surname = ?, email = ?, profession = ? WHERE idProfessor = ?;`,
                    [ dni, name, surname, email, profession, id ]); 

            if (data.affectedRows == 0) return res.status(404).json({message: `No existe el profesor con id ${id}`});
            
            return res.status(201).json({message: "Datos del profesor actualizado correctamente"});
        } catch(err) {
            res.status(500).send(err.message);
        }
    }
    async deleteProfessor(req, res){
        try{
            const { id } = req.params;
            const [data] = await db.query( 
                `DELETE FROM professors WHERE idProfessor = ?`, [ id ]
            );

            if(data.affectedRows == 0) return res.status(404).json({message: `No existe el profesor con id ${id}`});
            
            return res.status(200).json({message: "Profesor eliminado correctamente"});
        } catch(err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new ProfessorsController();