import { useEffect } from "react"
import { setAuthorizationCode } from "../api"
const Profile = () => {
    
    useEffect(() => {
        let url = window.location.href
        if (url.includes("code=")) {
            setAuthorizationCode(window.location.href)
        }
    }, [])
    
    return (
        <div className="profilePage">

        </div>
    )
}
export default Profile