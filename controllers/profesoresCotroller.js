const db = require('./../db/connection.js');

class ProfessorsController{

    constructor(){};

    consultProfessor(req,res){
        try{
            const { id } = req.params;
            db.query(
                `SELECT * FROM professors WHERE idProfessor = ?;`, [id],
                (err, data) => {
                    if ( err ) return res.status(400).send(err.message);

                    return res.status(201).json(data);
                }
            );
        }catch (e){
            res.status(500).send(e.message)
        }
    }

    consultProfessors(req, res){
        try{
            db.query(
                `SELECT * FROM professors;`, (err, data) => {
                    if(err) return res.status(400).send(err.message);
                    return res.status(201).json(data);
                }
            );
        }catch(e){
            res.status(500).send(e.message);
        }
    }

    insertProfessor(req, res){
        try{
            const { dni, name, surname, email, profession } = req.body;
            db.query(
                `INSERT INTO cursos.professors
                (idProfessor, dni, name, surname, email, profession)
                VALUES (null, ?, ?, ?, ?, ?);`, [dni, name, surname, email, profession], (err, rows) => {
                        
                    if(err) return res.status(400).send(err.message);
                        
                    if(rows.affectedRows == 1) return res.status(200).json({message: "Inserted Professor"});
                                          }
            );
        }catch(e){
            res.status(500).send(e.message);
        }
    }

    updateProfessor(req, res){
        try{
            const { id } = req.params;
            const { dni, name, surname, email, profession } = req.body;

            db.query(
                `UPDATE professors SET dni = ?, name = ?, surname = ?, email = ?, profession = ?
                    WHERE idProfessor = ?;`,[ dni, name, surname, email, profession , id], (err, rows) => {
                    
                        if(err) return res.status(400).send(err.message);

                        if(rows.affectedRows == 1) return res.status(200).json({message: "Updated Professor"});
                    }
            );
        } catch(e){
            res.status(500).send(e.message);    
        }
    }
    deleteProfessor(req, res){
        try{
            const { id } = req.params;
            db.query( 
                `DELETE FROM professors WHERE idProfessor = ?;`, [ id ], (err, rows) => {
                    if (err) return res.status(400).send(err.message);
                    if (rows.affectedRows == 1) return res.status(201).json({message : "Eliminated Professor"});
                });
        } catch(e) {
            res.status(500).send(e.message);
        }
    }
}

module.exports = new ProfessorsController();