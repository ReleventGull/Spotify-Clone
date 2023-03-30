require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')


const app = express()

app.use(cors())
app.use( morgan('dev'))
app.use(express.json())

PORT = 3500

app.listen(PORT,() => {
    console.log("I'm listening on", PORT)
})

 


const {CLIENT_SECRET} = process.env
const CLIENT_ID = '72ed8b325df848d8b1e19b4e8f4133db'
var scope = 'user-read-private user-read-email'





app.get('/login', (req, res, next) => {
    try {
        console.log("Im here")
        res.redirect([200, ], 'https://accounts.spotify.com/authorize' + 
           '?response_type=code' + '&client_id=' + CLIENT_ID +
           '&redirect_uri=' + encodeURIComponent("http://localhost:3000")
        )
    }catch(error) {
        console.error("there was an erro in app loginn", error)
        throw error
    }
})




