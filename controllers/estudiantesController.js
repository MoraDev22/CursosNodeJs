const db = require('../db/connection.js');
class EstudiantesController {

    constructor(){}

    consultStudent(req,res){
        try{
            const { id } = req.params;
            db.query(
                `SELECT * FROM students WHERE idStudent = ?`, [id], ( err,rows ) => {
                if (err) return res.status(400).send(err.message);
                return res.status(201).json(rows[0])
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    consultStudents(req,res){
        try{
            db.query(
                `SELECT * FROM students;`, ( err,rows ) => {
                    if (err) return res.status(400).send(err.message);
                    
                    return res.status(201).json(rows);
                });
        } catch(err) {
            res.status(500).send(err.message) 
        }
    }
    
    insertStudent(req,res){
        try{
            const { dni, name, surname, email } = req.body;
            db.query(
            `INSERT INTO cursos.students 
                (idStudent, dni, name, surname, email)
                VALUES (NULL, ?, ?, ?, ?);`,[dni, name, surname, email], ( err,rows ) => {
                if (err) return res.status(400).send(err.message);
                if (rows.affectedRows == 1) return res.status(201).json({message: "Inserted Student"});
            });

        } catch(err){
            res.status(500).send(err.message);
        }
    }

    updateStudent(req,res){
        const { id } = req.params;
        try{
            const { dni, name, surname, email } = req.body;
            db.query( 
                `UPDATE students SET dni = ?, name = ?, surname = ?, email = ? WHERE idStudent = ?;`,
                [ dni, name, surname, email, id ], (err, rows) => {
                    if (err) return res.status(400).send(err.message);
                    if (rows.affectedRows == 1) return res.status(201).json({message: "Updated Student"});
                });
        } catch(err) {
            res.status(500).send(err.message);
        }
    }

    deleteStudent(req,res){
        const { id } = req.params;
        try{
            db.query( 
                `DELETE FROM students WHERE idStudent = ?`,
                [ id ], (err, rows) => {
                    if (err) return res.status(400).send(err.message);
                    if (rows.affectedRows == 1) return res.status(201).json({message: "Eliminated Student"});
                });
        } catch(err) {
            res.status(500).send(err.message);
        }
    }
}


module.exports = new EstudiantesController();