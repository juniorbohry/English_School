const Person = require('../models/Person')

module.exports = class PersonController {
    static async register(req, res) {
        const name = req.body.name
        const email = req.body.email
        const age = req.body.age
        let teachingstaff = req.body.teachingstaff

        // 0 and 1 teachingstaff
        // if (teachingstaff === 'on') {
        //     teachingstaff = true
        // } else {
        //     teachingstaff = false
        // }

        //validations
        if(!name) {
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }
        if(!email) {
            res.status(422).json({message: 'O email é obrigatório'})
            return
        }
        if(!age) {
            res.status(422).json({message: 'A idade é obrigatória'})
            return
        }
        if(teachingstaff !== 1 && teachingstaff !== 0 ) {
            res.status(422).json({message: 'O campo é obrigatório'})
            return
        }

        //register person
        try {
            await Person.create({ name, email, age, teachingstaff })
            res.status(201).json({ message: `Pessoa registrada com sucesso!` })
            // res.redirect('/')
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async getAllPersonStudent(req, res) {
        try {
            const allStudents = await Person.findAll({
                raw: true,
                where: {
                    teachingstaff: 0
                }
            })
            res.status(200).json(allStudents)
        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    static async getAllPersonTeachingStaff(req, res) {
        try {
            const allTeachingStaff = await Person.findAll({
                raw: true,
                where: {
                    teachingstaff: 1
                }
            })
            res.status(200).json(allTeachingStaff)
        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    static async getPersonById(req, res) {
        const id = req.params.id

        try {
            const person = await Person.findOne({
                raw: true,
                where: {
                    id: id
                }
            })
            res.status(200).json(person)
        } catch(error) {
            res.status(500).json({message: error})
        }
    }
}