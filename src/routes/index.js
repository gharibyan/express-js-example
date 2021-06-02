const express = require('express')
const router = express.Router()
const HeroRoutes = require('../modules/heroes/routes')
const apiRoutes = [{
    route: '/heroes',
    module: [HeroRoutes]
}]


for (const val of apiRoutes) {
    router.use(val.route, val.module)
}

module.exports = router
