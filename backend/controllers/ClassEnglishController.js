const Classenglish = require('../models/Classenglish')

module.exports = class ClassEnglishController {
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

        //check teachingstaff
        
      
        //register class
        try {
            await Classenglish.create({ name_class, PersonId, LevelId })
            res.status(201).json({ message: `Turma registrada com sucesso!` })
            // res.redirect('/')
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}