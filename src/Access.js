import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchProfile, grantAccess } from "./api"


const Access = ({token}) => {
    const navigate = useNavigate()
    
    const verifyToken = async() => {
        if(token) {
            const response =  await fetchProfile(token)
            if(!response.error) {
            navigate('/spotify/profile')
        }
    }   
}
useEffect(() => {
    verifyToken()
}, [])
    
    return (
        <div className="accesPage">
            <div className="loginRegisterHeader">
                <img className="spotifyLogo" src="/images/Spotify_logo_with_text.svg.png"/>
            </div>
            <div className="centerContainer">
                <h2>Click below to grant access!</h2>
                <button onClick={async() => await grantAccess   ()}>Grant Access</button>
            </div>
        </div>
    )
}
export default Access