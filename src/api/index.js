import { json } from "react-router-dom"

const BASE_URL = "http://localhost:3500"
const CLIENT_SECRET = '403a4dbfb2bd4669988951704ec483a4'
const CLIENT_ID = '72ed8b325df848d8b1e19b4e8f4133db'
const TOKEN = 'https://accounts.spotify.com/api/token'

export const grantAccess = async() => {
    try {
        const querystring = 'https://accounts.spotify.com/authorize' + 
        '?response_type=code' + 
        '&client_id=' + CLIENT_ID + 
        '&scope=user-read-email user-read-private user-library-read' + 
        '&show_dialog=true' + 
        '&redirect_uri=' + 
        encodeURI("http://localhost:3000/callback")
        window.location.href = querystring
        return true
    }catch(error) {
        console.error("There was an error granting access in src/api/index.js", error)
        throw error
    }
}
function handleAccessToken() {
    if (this.status == 200) {
        let data = JSON.parse(this.responseText)
        console.log(data)
        localStorage.setItem('authorization', data.access_token)
    }
}
export const setAuthorizationCode = (code) => {
    try {
        if (code) {
            const [ , authorizaitonCode] = code.split("code=")
            let body = 'grant_type=authorization_code'
            body += '&code=' + authorizaitonCode
            body += '&redirect_uri=http://localhost:3000/callback' 
            body += '&client_id=' + CLIENT_ID
            body += '&client_secret' + CLIENT_SECRET
            let xhr = new XMLHttpRequest()
            xhr.open("POST", TOKEN, true) 
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET))
            xhr.send(body)
            xhr.onload = handleAccessToken
        }
    }catch(error) {
        console.error("There was an error setting Authorization code", error)
        throw error
    }
}


/*********************************************************Profile******************************************** */
export const fetchProfile = async(token) => {
    try {  
       const response = await fetch('https://api.spotify.com/v1/me', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error fetching the users profile", error)
        throw error
    }
}

const fetchUserTracks = async({token, limit, offset}) => {
    try {
        const respones = await fetch('https://api.spotify.com/v1/me/tracks', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                limit: limit, 
                offset: offset
            })
        })
    }catch(error) {
        console.error('There was an error getting saved user tracks', error)
        throw error
    }
}