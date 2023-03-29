const express = require('express')
const cors = require('cors')
const morgan = require('morgan')


const server = express()

server.use(cors())
server.use( morgan('dev'))
server.use(express.json())

PORT = 3500

server.listen(PORT,() => {
    console.log("I'm listening on", PORT)
})

const apiRouter = require('./api/index')

server.use('/api', apiRouter)

