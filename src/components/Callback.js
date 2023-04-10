import { useEffect } from "react"
import { setAuthorizationCode } from "../api"
import { useNavigate } from "react-router-dom"

const Callback = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        let url = window.location.href
        let otherUrl = window.location.search

        if (url.includes("code=")) {
            let response = setAuthorizationCode(window.location.href)
            setTimeout(() => {
                navigate('/spotify/profile')
            }, 1000)
        }
    }, [])
    
    return (
        <h2>Redirecting...</h2>
    )
}

export default Callback