const {
    getSuperHero,
    getAllSuperHeroes,
    createSuperHero,
    updateSuperHero,
    deleteSuperHero
} = require('./services')

exports.getHero = (req, res) => {
    const {id} = req.query
    let superHero = !id ? getAllSuperHeroes() : getSuperHero(id)
    res.status(200).json(superHero)
}

exports.createHero = (req, res) => {
    const superHero = createSuperHero()
    res.status(200).json(superHero)
}

exports.updateHero = (req, res) => {
    const updatedHero = updateSuperHero(req.body)
    res.status(200).json(updatedHero)
}

exports.deleteHero = (req, res) => {
    const {id} = req.query
    const newSuperHeroList = deleteSuperHero(id)
    res.status(200).json(newSuperHeroList)
}
