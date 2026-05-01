const error = {
    error: "Campos vacios"
};

const ValidateStudentData = (req, res, next) => {
    const { dni, name, surname, email } = req.body;

    if( !dni || !name || !surname || !email ) return res.status(400).json({error : "Campos vacios"});

    next();
}

const ValidateProfessorData = (req, res, next) => {
    const { dni, name, surname, email, profession } = req.body;

    if( !dni || !name || !surname || !email || !profession ) {
        return res.status(400).json({error: "Campos de profesor vacios"});
    }
    
    next();
}

const ValidateCourseData = (req, res, next) => {
    const { idProfessor, name, description } = req.body;

    if( !idProfessor || !name || !description) return res.status(400).json(error);

    next();
}
//Exportamos las funciones como objeto
module.exports = { ValidateStudentData, ValidateProfessorData, ValidateCourseData };
