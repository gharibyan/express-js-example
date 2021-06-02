const express = require('express')
const router = express.Router()
const {
    getHero,
    createHero,
    updateHero,
    deleteHero
} = require('./controller')

router.route('/')
    .get(getHero)
    .post(createHero)
    .put(updateHero)
    .delete(deleteHero)

module.exports = router
