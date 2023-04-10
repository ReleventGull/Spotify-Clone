import { Outlet } from "react-router-dom"
import {Link} from 'react-router-dom'
import PlayArea from "./components/PlayArea"
const NavBar = ({currentSong, isPlaying, setIsPlaying}) => {
    return (
        <>
        <div className="app2">
        <div className="navBar">
            <div className="container1Nav">
                <div className="topBar">
                    <Link><img className='logo' src='/images/spotifyProfile.png' />Profile</Link>
                    <Link><img className='logo' src='/images/spotifyHome.png' />  Home</Link>
                    <Link><img className='logo' src='/images/spotifySearch.png' /> Search</Link>
                    <Link><img className='logo' src='/images/spotifyLibrary.png' /> Your Library</Link>
                </div>
            </div>
        </div>
       
        < Outlet/>
        
        </div>
        <PlayArea isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong}/>
        </>
        

    )
}
export default NavBar