import { Outlet } from "react-router-dom"
import {Link} from 'react-router-dom'
import PlayArea from "./components/PlayArea"
const NavBar = ({shuffle, repeat, setShuffle, setRepeat, currentSong, isPlaying, setIsPlaying}) => {
    return (
        <>
        <div className="app2">
        <div className="navBar">
            <div className="container1Nav">
                <div className="topBar">
                    <Link to='profile' ><img className='logo'  src='/images/spotifyProfile.png' />Profile</Link>
                    <Link to='home'> <img className='logo'  src='/images/spotifyHome.png' />  Home</Link>
                    <Link><img className='logo' src='/images/spotifySearch.png' /> Search</Link>
                    <Link><img className='logo' src='/images/spotifyLibrary.png' /> Your Library</Link>
                </div>
            </div>
        </div>
       
        < Outlet/>
        
        </div>
        <PlayArea shuffle={shuffle} repeat={repeat} setShuffle={setShuffle} setRepeat={setRepeat} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong}/>
        </>
        

    )
}
export default NavBar