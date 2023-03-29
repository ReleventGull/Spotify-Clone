const express = require('express')

const indexRouter = express.Router()

indexRouter.get('/health', (req, res, next) => {
    res.send({messaage: "I'm healthy"})
    }
)

module.exports = indexRouter
