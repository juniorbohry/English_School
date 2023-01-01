const Level = require('../models/Level')

module.exports = class LevelController {
    // register a level
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
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    // get all registered levels
    static async getAllLevels(req, res) {
        try {
            const allLevels = await Level.findAll({raw: true})
            res.status(200).json(allLevels)
        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    // get a specific level
    static async getLevelById(req, res) {
        const id = req.params.id

        try {
            const level = await Level.findOne({
                raw: true,
                where: {
                    id: id
                }
            })
            res.status(200).json(level)
        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    //remove level by id
    static async removeLevelById(req, res) {
        const id = req.params.id

        // check if level exists
        const level = await Level.findOne({
            raw: true,
            where: {
                id: id
            }        
        })
        if(!level) {
            res.status(404).json({message: 'Level não encontrado.'})
            return
        }

        try {
            await Level.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).json({message: 'Level removido com sucesso!'})
        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    // update level by id
    static async updateLevelById(req, res) {
        const id = req.params.id
        const description_level = req.body.description_level

        const updateLevel = {}

        // check if level exists
        const level = await Level.findOne({
            where: {
                id: id
            }
        })
        if (!level) {
            res.status(404).json({message: 'Level não encontrado!'})
            return
        }

        //validations
        if(!description_level) {
            res.status(422).json({message: 'A descrição do nível é obrigatória'})
            return
        } else {
            updateLevel.description_level = description_level
        }


        try {
            await Level.update(updateLevel, {
                where: {
                    id: id
                }
            })
            res.status(201).json({ message: 'Level atualizado com sucesso!' })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}