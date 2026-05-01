const db = require('../db/connection');

class CursosController {

    constructor(){}

    consultCourse(req,res){
        try{
            const { id } = req.params;
            db.query(
                `SELECT * FROM course WHERE idCourse = ?;`, [id], ( err, data ) => {
                if (err) res.status(400).send(err);
                res.status(201).json(data[0]);
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    consultCourses(req,res){
        try{
            db.query(
                `SELECT * FROM course;`, (err,data) => {
                if (err) res.status(400).send(err);
                res.status(201).json(data[0]);
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    
    insertCourse (req,res){
        try{
            const { idProfessor, name, description } = req.body;
            db.query(
                `SELECT * FROM professors WHERE idProfessor = ?;`, [idProfessor], (err, rows) => {
                    if (err) res.status(400).send(err);
                    if (rows.length === 0) res.status(400).json({error: "Professor does not exist in the professor table"});

                    db.query(
                        `INSERT INTO course 
                            (idProfessor, name, description)
                            VALUES (?, ?, ?);`,[idProfessor, name, description], ( err,rows ) => {
                            if (err) res.status(400).send(err);
                            if (rows.affectedRows == 1) res.status(201).json({message: "Inserted Course"});
                    });

                }
            );

        } catch(err){
            res.status(500).send(err.message);
        }
    }

    updateCourse(req,res){
        try{
            const { id } = req.params;
            const { idProfessor, name, description } = req.body;
            db.query( 
                `UPDATE course SET idProfessor = ?, name = ?, description = ? WHERE idCourse = ?;`,
                [ idProfessor, name, description, id ], (err, rows) => {
                    if (err) res.status(400).send(err);
                    if (rows.affectedRows == 1) res.status(201).json({message: "Updated Course"});
                });
        } catch(err) {
            res.status(500).send(err.message);
        }
    }

    deleteCourse(req,res){
        try{
            const { id } = req.params;
            db.query( 
                `DELETE FROM course WHERE idCourse = ?`,
                [ id ], (err, rows) => {
                    if (err) res.status(400).send(err);
                    if (rows.affectedRows == 1) res.status(201).json({message: "Eliminated Course"});
                });
        } catch(err) {
            res.status(500).send(err.message);
        }
    }
}


module.exports = new CursosController();