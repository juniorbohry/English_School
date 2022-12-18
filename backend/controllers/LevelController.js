const Level = require('../models/Level')

module.exports = class LevelController {
    static async registerLevel(req, res) {
        const description_level = req.body.description_level
       
        //validations
        if(!description_level) {
            res.status(422).json({message: 'A descrição do nível é obrigatória'})
            return
        }
      
        //register level
        try {
            await Level.create({ description_level })
            res.status(201).json({ message: `Level registrado com sucesso!` })
            // res.redirect('/')
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}