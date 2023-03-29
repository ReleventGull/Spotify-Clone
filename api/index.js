const express = require('express')
const {CLIENT_SECRET} = process.env
const CLIENT_ID = '72ed8b325df848d8b1e19b4e8f4133db'
const apiRouter = express.Router()

apiRouter.get('/login', (req, res, next) => {
    res.redirect(
        'https://accounts.spotify.com/authorize?' + 
        JSON.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            redirect_uriL: "localhost:3000"
        })
    )
})

module.exports = apiRouter
