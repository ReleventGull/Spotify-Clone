import { useEffect } from "react"
import { setAuthorizationCode } from "../api"
import { useNavigate } from "react-router-dom"

const Callback = () => {
    const navigate = useNavigate()

    useEffect(() => {
        let url = window.location.href
        if (url.includes("code=")) {
            setAuthorizationCode(window.location.href)
            setTimeout(() => {
                navigate('/profile')
            }, 2000)
        }
    }, [])
    
    return (
        <h2>Redirecting...</h2>
    )
}

export default Callback