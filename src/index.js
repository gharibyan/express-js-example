const http = require('http')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')

const routes = require('./routes')

const corsConfigs = {
    origin: process.env.ALLOWED_HOSTS
        ? process.env.ALLOWED_HOSTS.split(',').map(x => new RegExp(x))
        : '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}

const app = express()
// The Sentry request handler must be the first middleware on the app

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(compression())
app.use(cors(corsConfigs))

app.use('/api', routes)


// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Route not found.')
    err.status = 404
    next(err)
})

// generic error handler
app.use((err, req, res) => {
    const status = err.status || 500
    res.status(status)
    const response = {
        error: err.message,
        code: err.code,
        stack: process.env.NODE_ENV !== 'production' && status > 499
            ? err.stack
            : undefined
    }
    res.json(response)
})


const PORT = parseInt(process.env.PORT || '3005', 10)

app.set('port', PORT)

const server = http.createServer(app)

server.listen(PORT, (err) => {
    if (err) {
        console.error('Failed to start application.')
        console.error(err)
        process.exit(1)
    }
    console.log(`Application now listening on: <http://localhost:${server.address().port}>`)
})
