import { Link } from "react-router-dom"

const LoginRegister = () => {
    return (
        <div className="loginRegisterPage">
            <div className="loginRegisterHeader">
                <img className="spotifyLogo" src="/images/Spotify_logo_with_text.svg.png"/>
            </div>
            
            <div className="bottomContainer">   
                <form className="loginForm">
                   <div className="input1">
                        <label>Email address or username</label>
                        <input placeholder="Email address or username"></input>
                   </div>
                   <div className="input1">
                        <label>Password</label>
                        <input placeholder="Password"></input>
                   </div>
                   <div className="bottomContainer2">
                        <div className="loginBox">
                            <div className="checkBoxContainer">
                                <input type='checkbox'/> 
                                <span>Remmber me</span>
                            </div>
                            <button className="loginButton">LOG IN</button>
                        </div>
                   </div>
                   <span className="borderLogin"></span>
                </form>

                <div className="bottomContainer3">
                    <h3>Don't have an account?</h3>
                    <Link>SIGN UP FOR SPOTIFY</Link>
                </div>
            </div>

        </div>
    )
}

export default LoginRegister