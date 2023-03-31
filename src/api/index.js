const BASE_URL = "http://localhost:3500"
const {CLIENT_SECRET} = process.env
const CLIENT_ID = '72ed8b325df848d8b1e19b4e8f4133db'


export const grantAccess = async() => {
    try {
        const querystring = 'https://accounts.spotify.com/authorize' + '?response_type=code' + '&client_id=' + CLIENT_ID + '&redirect_uri=' + encodeURIComponent("http://localhost:3000/callback")
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
            window.localStorage.setItem('authorization', authorizaitonCode)
        }
        
    }catch(error) {
        console.error("There was an error setting Authorization code", error)
        throw error
    }
}

export const fetchProfile = async(token) => {
    try {
        token = 'BQAZ09vGmZAM6iChzue3SL0UJ5JDueEMm4Z5fvyTjZwN0GFZu6XDQi4azDblRfe_F266iNpD4Vg7bX3nHThULfhEYxZ_UtFQFJcrFgk7pGeZEGNBIJ6cETrKaOS2lsl7mUMnCGv56BRLNwtNv8en0K15LWkuMx9UgP1F14_JnC0F8bgd-jA'
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