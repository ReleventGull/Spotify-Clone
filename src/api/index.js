const BASE_URL = "http://localhost:3500"
const {CLIENT_SECRET} = process.env
const CLIENT_ID = '72ed8b325df848d8b1e19b4e8f4133db'


export const grantAccess = async() => {
    try {
        const querystring = 'https://accounts.spotify.com/authorize' + '?response_type=code' + '&client_id=' + CLIENT_ID + '&redirect_uri=' + encodeURIComponent("http://localhost:3000/")
        window.location.href = querystring
        return true
    }catch(error) {
        console.error("There was an error granting access in src/api/index.js", error)
        throw error
    }
}

export const setAuthorizationCode = (code) => {
    try {
        if (code) {
            const [ , authorizaitonCode] = code.split("code=")
            console.log(authorizaitonCode)
            window.localStorage.setItem('authorization', authorizaitonCode)
        }
        
    }catch(error) {
        console.error("There was an error setting Authorization code", error)
        throw error
    }
}