const Enrollment = require('../models/Enrollment')

module.exports = class EnrollmentController {
    static async registerEnrollment(req, res) {
        const made_by = req.body.made_by
        const active = req.body.active
        const PersonId = req.body.PersonId
        const ClassenglishId = req.body.ClassenglishId
        
       
        //validations
        if(!made_by) {
            res.status(422).json({message: 'O responsável administrativo pela matrícula é obrigatório'})
            return
        }
        if(active !== 1 && active !== 0) {
            res.status(422).json({message: 'É  obrigatório marcar se a matrícula está ativa ou não'})
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
        

        //verificar se a matricula já existe????
      
        //register level
        try {
            await Enrollment.create({ made_by, active, PersonId, ClassenglishId })
            res.status(201).json({ message: `Matrícula realizada com sucesso!` })
            // res.redirect('/')
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async getAllEnrollments(req, res) {
        try {
            const allEnrollments= await Enrollment.findAll({raw: true})
            res.status(200).json(allEnrollments)
        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    static async getAllActiveEnrollments(req, res) {
        try {
            const allActiveEnrollments= await Enrollment.findAll({
                raw: true,
                where: {
                    active: 1
                }
            })
            res.status(200).json(allActiveEnrollments)
        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    static async getAllInactiveEnrollments(req, res) {
        try {
            const allInactiveEnrollments= await Enrollment.findAll({
                raw: true,
                where: {
                    active: 0
                }
            })
            res.status(200).json(allInactiveEnrollments)
        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    static async getEnrollmentById(req, res) {
        const id = req.params.id

        try {
            const enrollment = await Enrollment.findOne({
                raw: true,
                where: {
                    id: id
                }
            })
            res.status(200).json(enrollment)
        } catch(error) {
            res.status(500).json({message: error})
        }
    }
}