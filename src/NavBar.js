import { Outlet } from "react-router-dom"
import {Link} from 'react-router-dom'
import PlayArea from "./components/PlayArea"
const NavBar = () => {
    return (
        
        <div className="app2">
        
        <div className="mainPart">
        <div className="navBar">
            <div className="container1Nav">
                <div className="topBar">
                    <Link to='profile' ><img className='logo'  src='/images/spotifyProfile.png' />Profile</Link>
                    <Link to='home'> <img className='logo'  src='/images/spotifyHome.png' />  Home</Link>
                    <Link><img className='logo' src='/images/spotifySearch.png' /> Search</Link>
                    <Link><img className='logo' src='/images/spotifyLibrary.png' /> Your Library</Link>
                </div>
                <div className="topBar2">
                    <Link to='likedsongs'><img className='likedLogo' src='/images/LikedIcon.png' /> Your Library</Link>
                </div>
            </div>
        </div>
        < Outlet/>
        </div>
        
        
        <PlayArea />
        
        </div>
    )
}
export default NavBar