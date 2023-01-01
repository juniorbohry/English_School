const Enrollment = require('../models/Enrollment')

module.exports = class EnrollmentController {
    // register a enrollment
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

        //check if the person is already enrolled in the same class.
        const checkExisteEnrollment = await Enrollment.findAll({
            raw: true,
            where: {
                PersonId: PersonId,
                ClassenglishId: ClassenglishId
            }
        })
        if(checkExisteEnrollment) {
            res.status(422).json({message: 'Esta pessoa já está matriculada nesta turma ou possui matricula inativa!'}) 
            return
        }
      
        try {
            await Enrollment.create({ made_by, active, PersonId, ClassenglishId })
            res.status(201).json({ message: `Matrícula realizada com sucesso!` })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    // get all enrollments
    static async getAllEnrollments(req, res) {
        try {
            const allEnrollments= await Enrollment.findAll({raw: true})
            res.status(200).json(allEnrollments)
        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    // get all active enrollments
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

    // get all inactive enrollments
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

    // get a specific enrollment
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

    //remove enrollment by id
    static async removeEnrollmentById(req, res) {
        const id = req.params.id

        // check if enrollment exists
        const enrollment = await Enrollment.findOne({
            raw: true,
            where: {
                id: id
            }        
        })
        if(!enrollment) {
            res.status(404).json({message: 'Enrollment não encontrado.'})
            return
        }

        try {
            await Enrollment.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).json({message: 'Enrollment removido com sucesso!'})
        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    // Update enrollment by Id
    static async updateEnrollmentById(req, res) {
        const id = req.params.id
        const made_by = req.body.made_by
        const active = req.body.active
        const PersonId = req.body.PersonId
        const ClassenglishId = req.body.ClassenglishId

        const updateEnrollment = {}

        // check if person exists
        const enrollment = await Enrollment.findOne({
            where: {
                id: id
            }
        })
        if (!enrollment) {
            res.status(404).json({message: 'Matrícula não encontrada!'})
            return
        }
        
        //validations
        if(!made_by) {
            res.status(422).json({message: 'O responsável administrativo pela matrícula é obrigatório'})
            return
        } else {
            updateEnrollment.made_by = made_by
        }

        if(active !== 1 && active !== 0) {
            res.status(422).json({message: 'É  obrigatório marcar se a matrícula está ativa ou não'})
            return
        } else {
            updateEnrollment.active = active
        }

        if(!PersonId) {
            res.status(422).json({message: 'PersonId é obrigatório'})
            return
        } else {
            updateEnrollment.PersonId = PersonId
        }

        if(!ClassenglishId) {
            res.status(422).json({message: 'ClassenglishId é obrigatório'})
            return
        } else {
            updateEnrollment.ClassenglishId = ClassenglishId
        }
        
        try {
            await Enrollment.update(updateEnrollment, {
                where: {
                    id: id
                }
            })
            res.status(201).json({ message: 'Matrícula atualizada com sucesso!' })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}