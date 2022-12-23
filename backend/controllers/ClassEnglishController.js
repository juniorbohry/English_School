const Classenglish = require('../models/Classenglish')

module.exports = class ClassEnglishController {
    // register a class
    static async registerClass(req, res) {
        const name_class = req.body.name_class
        const PersonId = req.body.PersonId
        const LevelId = req.body.LevelId
        console.log(name_class)
       
        //validations
        if(!name_class) {
            res.status(422).json({message: 'O nome da turma é obrigatório!'})
            return
        }
        if(!PersonId) {
            res.status(422).json({message: 'PersonId é obrigatório!'})
            return
        }
        if(!LevelId) {
            res.status(422).json({message: 'LevelId é obrigatório!'})
            return
        }

        //falta verificar teachingstaff
        
        try {
            await Classenglish.create({ name_class, PersonId, LevelId })
            res.status(201).json({ message: `Turma registrada com sucesso!` })
            // res.redirect('/')
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    // get all class
    static async getAllClass(req, res) {
        try{
            const allClass = await Classenglish.findAll({raw: true})
            res.status(200).json(allClass)
        }catch {
            res.status(500).json({message: error})
        }
    }

    // get all basic class 
    static async getAllClassBasic(req, res) {
        try {
            const allClassBasic = await Classenglish.findAll({
                raw: true,
                where: {
                    LevelId: 1
                }
            })
            res.status(200).json(allClassBasic)
        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    // get all intermediary class 
    static async getAllClassIntermediary(req, res) {
        try {
            const allClassIntermediary = await Classenglish.findAll({
                raw: true,
                where: {
                    LevelId: 2
                }
            })
            res.status(200).json(allClassIntermediary)
        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    // get all advanced class
    static async getAllClassAdvanced(req, res) {
        try {
            const allClassAdvanced = await Classenglish.findAll({
                raw: true,
                where: {
                    LevelId: 3
                }
            })
            res.status(200).json(allClassAdvanced)
        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    // get a specific class
    static async getClassById(req, res) {
        const id = req.params.id

        try {
            const classenglish = await Classenglish.findOne({
                raw: true,
                where: {
                    id: id
                }
            })
            res.status(200).json(classenglish)
        } catch(error) {
            res.status(500).json({message: error})
        }
    }
}