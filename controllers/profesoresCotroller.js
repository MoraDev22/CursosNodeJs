const db = require('./../db/connection.js');

class ProfessorsController{

    constructor(){};

    consultProfessor(req,res){
        const { id } = req.params;
        try{
            db.query(
                `SELECT * FROM professors WHERE idProfessor = ?;`, [id],
                (err, data) => {
                    if ( err ) res.status(400).send(err);

                    res.status(201).json(data);
                }
            );
        }catch (e){
            res.status(500).send(err.message)
        }
    }

    consultProfessors(req, res){
        try{
            db.query(
                `SELECT * FROM professors;`, (err, data) => {
                    if(err) res.status(400).send(err);
                    res.status(201).json(data);
                }
            );
        }catch(e){
            res.status(500).send(err.message);
        }
    }

    insertProfessor(req, res){
        const { dni, name, surname, email, profession } = req.body;
        try{
            db.query(
                `INSERT INTO cursos.professors
                (idProfessor, dni, name, surname, email, profession)
                VALUES (null, ?, ?, ?, ?, ?);`, [dni, name, surname, email, profession], (err, data) => {
                        
                    if(err) res.status(400).send(err);
                        
                    if(rows.affectedRows == 1) res.status(200).json({message: "Inserted Professor"});
                                          }
            );
        }catch(e){
            res.status(500).send(err.message);
        }
    }

    updateProfessor(req, res){
        const { id } = req.params;
        try{
            const { dni, name, surname, email, profession } = req.body;

            db.query(
                `UPDATE professors SET dni = ?, name = ?, surname = ?, email = ?, profession = ?
                    WHERE idProfessor = ?;`,[ dni, name, surname, email, profession , id], (error, rows) => {
                        
                        if(error) res.status(400).send(err);

                        if(rows.affectedRows == 1) res.status(200).json({message: "Updated Professor"});
                    }
            );
        } catch(e){
            res.status(500).send(e.message);    
        }
    }
    deleteProfessor(req, res){
        const { id } = req.params;
        try{
            db.query( 
                `DELETE FROM professors WHERE idProfessor = ?;`, [ id ], (err, rows) => {
                    if (err) res.status(400).send(err);
                    if (rows.affectedRows == 1) res.status(201).json({message : "Eliminated Professor"});
                });
        } catch(err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new ProfessorsController();