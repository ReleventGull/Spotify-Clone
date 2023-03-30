import {useState, useEffect} from 'react'
import { Link } from "react-router-dom"


const LoginRegister = () => {
    const [viewPassword, setViewPassword] = useState(false)
    
    useEffect(() => {
        console.log('I loaded')
    }, [])

    return (
        <div className="loginRegisterPage">
            <div className="loginRegisterHeader">
                <img className="spotifyLogo" src="/images/Spotify_logo_with_text.svg.png"/>
            </div>
            
            <div className="bottomContainer">   
                <form className="loginForm">
                   <div className="input1">
                        <label>Email address or username</label>
                        <div className="usernameBox">   
                            <input placeholder="Email address or username"></input>
                        </div>
                   </div>
                   <div className="input1">
                        <label>Password</label>
                            <div className="passwordBox">
                                <input className="passwordInput" type={viewPassword ? null : 'password'} placeholder="Password"></input>
                                <div className='viewPassword'>
                                    <img  onClick={() => setViewPassword(pre => !pre)} className='viewPasswordImage'  src={viewPassword ? "/images/eye.png" : "/images/closedeye.png"} />
                                </div>
                                
                            </div> 
                   </div>
                   <div className="bottomContainer2">
                        <div className="loginBox">
                            <div className="checkBoxContainer">
                                <input type='checkbox'/> 
                                <span>Remember me</span>
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