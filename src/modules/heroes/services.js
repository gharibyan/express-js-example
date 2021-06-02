const SUPER_HEROES = [{
    id: 1,
    firstName: 'Bruce',
    lastName: 'Wayne',
    nickName: 'Batman'
}, {
    id: 2,
    firstName: 'Tony',
    lastName: 'Stark',
    nickName: 'Iron Man'
}]

const firstNames = ['Clark', 'Hal', 'Diana', 'Bruce', 'Steve', 'Thor']
const lastNames = ['Kent', 'Jordan', 'Prince', 'Banner', 'Rodgers', 'Odinson']
const nickNames = ['Superman', 'Green Lantern', 'Hulk', 'Capitan America', 'Thor']

const randomNumber = (arrayLength) => Math.floor(Math.random() * arrayLength);

exports.getAllSuperHeroes = () => SUPER_HEROES

exports.getSuperHero = id => {
    const hero = SUPER_HEROES.find(hero => hero.id === parseInt(id))
    if (!hero) {
        const error = new Error('Hero not found')
        error.status = 404
        throw error
    }
    return hero
}

exports.createSuperHero = () => {
    const heroObject = {
        id: SUPER_HEROES.length + 1,
        firstName: firstNames[randomNumber(firstNames.length)],
        lastName: lastNames[randomNumber(lastNames.length)],
        nickName: nickNames[randomNumber(nickNames.length)],
    }
    SUPER_HEROES.push(heroObject)
    return heroObject
}

exports.updateSuperHero = (data) => {
    const {id, firstName, lastName, nickName} = data
    const superHeroIndex = SUPER_HEROES.findIndex(hero => hero.id === id)
    if (superHeroIndex < 0) {
        const error = new Error('Hero not found')
        error.status = 404
        throw error
    }
    const superHero = SUPER_HEROES[superHeroIndex]
    if (firstName) {
        superHero.firstName = firstName
    }
    if (lastName) {
        superHero.lastName = lastName
    }
    if (nickName) {
        superHero.nickName = nickName
    }
    SUPER_HEROES[superHeroIndex] = superHero
    return superHero
}

exports.deleteSuperHero = id => {
    if (!id) {
        const error = new Error('id is required')
        error.status = 400
        throw error
    }
    const superHeroIndex = SUPER_HEROES.findIndex(hero => hero.id === parseInt(id))
    if (superHeroIndex < 0) {
        const error = new Error('Hero not found')
        error.status = 404
        throw error
    }
    SUPER_HEROES.splice(superHeroIndex, 1)
    return SUPER_HEROES
}
