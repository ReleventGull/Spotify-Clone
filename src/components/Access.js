import { grantAccess } from "../api"

const Access = () => {
    const authorization = async() => {
        let access = await grantAccess()
        if (!access.success) {
            alert("Error granting access!")
            return
        }
    }
    return (
        <div className="accesPage">
            <div className="loginRegisterHeader">
                <img className="spotifyLogo" src="/images/Spotify_logo_with_text.svg.png"/>
            </div>
            <div className="centerContainer">
                <h2>Click below to grant access!</h2>
                <button onClick={async() => await grantAccess()}>Grant Access</button>
            </div>
        </div>
    )
}
export default Access