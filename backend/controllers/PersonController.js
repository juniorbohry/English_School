const Person = require('../models/Person')

module.exports = class PersonController {
    // register a person
    static async register(req, res) {
        const name = req.body.name
        const email = req.body.email
        const age = req.body.age
        let teachingstaff = req.body.teachingstaff

        // 0 and 1  checkbox teachingstaff
        if (teachingstaff === "on") {
            teachingstaff = 1
        } else if(teachingstaff !== 1 && teachingstaff !== "on"){
            teachingstaff = 0
        }


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

        try {
            await Person.create({ name, email, age, teachingstaff })
            res.status(201).json({ message: `Pessoa registrada com sucesso!` })
            // res.redirect('/')
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    // get all registered person students
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

    // get all registered Teaching Staff
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

    // get a specific person
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

    
    //remove person by id
    static async removePersonById(req, res) {
        const id = req.params.id

        // check if person exists
        const person = await Person.findOne({
            raw: true,
            where: {
                id: id
            }        
        })
        if(!person) {
            res.status(404).json({message: 'Pessoa não encontrada.'})
            return
        }

        try {
            await Person.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).json({message: 'Pessoa removida com sucesso!'})
        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    static async updatePersonById(req, res) {
        const id = req.params.id
        const name = req.body.name
        const email = req.body.email
        const age = req.body.age
        let teachingstaff = req.body.teachingstaff

        const updatePerson = {}

        // check if person exists
        const person = await Person.findOne({
            where: {
                id: id
            }
        })
        if (!person) {
            res.status(404).json({message: 'Pessoa não encontrada.'})
            return
        }

        //validations
        if(!name) {
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        } else {
            updatePerson.name = name
        }

        if(!email) {
            res.status(422).json({message: 'O email é obrigatório'})
            return
        } else {
            updatePerson.email = email
        }

        if(!age) {
            res.status(422).json({message: 'A idade é obrigatória'})
            return
        } else {
            updatePerson.age = age
        }

        if(teachingstaff !== 1 && teachingstaff !== 0 ) {
            res.status(422).json({message: 'O campo é obrigatório'})
            return
        } else {
            updatePerson.teachingstaff = teachingstaff
        }

        try {
            await Person.update(updatePerson, {
                where: {
                    id: id
                }
            })
            res.status(201).json({ message: `Pessoa atualizada com sucesso!` })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}