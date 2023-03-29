const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const serverRouter = express.Router()
const server = express()

server.use(cors())
server.use(morgan)

PORT = 3500

server.listen(PORT,() => {
    console.log("I'm listening on", PORT)
})