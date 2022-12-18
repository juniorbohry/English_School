const Enrollment = require('../models/Enrollment')

module.exports = class EnrollmentController {
    static async registerEnrollment(req, res) {
        const made_by = req.body.made_by
        const PersonId = req.body.PersonId
        const ClassenglishId = req.body.ClassenglishId
       
        //validations
        if(!made_by) {
            res.status(422).json({message: 'O responsável administrativo pela matrícula é obrigatório'})
            return
        }
        if(!PersonId) {
            res.status(422).json({message: 'PersonId é obrigatório'})
            return
        }
        if(!ClassenglishId) {
            res.status(422).json({message: 'ClassenglishId é obrigatório'})
            return
        }
      
        //register level
        try {
            await Enrollment.create({ made_by, PersonId, ClassenglishId })
            res.status(201).json({ message: `Matrícula realizada com sucesso!` })
            // res.redirect('/')
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}