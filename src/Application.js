import { useState, useEffect,  } from 'react'
import Access from './Access'
import { LoginRegister, Callback, Profile, Home } from './components/index'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { fetchProfile, getPlayerbackState } from './api'
import NavBar from './NavBar'
const App = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState(window.localStorage.getItem('authorization') || null)
    const [currentSong, setCurrentSong] = useState(null)
    const [isPlaying, setIsPlaying ] = useState(false)
    const [repeat, setRepeat] = useState(null)
    const [shuffle, setShuffle] = useState(null)
    
    const checkToken = async() => {
        const url = window.location.href
        const token = window.localStorage.getItem('authorization')
        if (url.includes('code=')) return
        if (token) {
            const response = await fetchProfile(token)
            if (response.error) {
                navigate('/access')
            }
        }else {
            navigate('/access')
        }
    }
    
    useEffect(() => {
            checkToken()
        }, [])

    useEffect(() => {
        console.log()
        getPlayer()
        if (token && isPlaying) {
         let time = setInterval(() => {
            getPlayer()
         }, 500)
         if (!isPlaying) {
            clearInterval(time)
         }
        }
    }, [isPlaying])
    
    const getPlayer = async() => {   
        
        const response = await getPlayerbackState(token)
        setIsPlaying(response.is_playing)
        setCurrentSong(response)
        setShuffle(response.shuffle_state)
        setRepeat(response.repeat_state)
        return response
    }
  
    return (
        <Routes>
        <Route path='callback' element={<Callback />}/>
        <Route path='access' element={<Access />}/>
            <Route path='spotify/*' element={<NavBar shuffle={shuffle} repeat={repeat} setShuffle={setShuffle} setRepeat={setRepeat} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong}/>}>
                <Route path='profile'  element={<Profile />}/>
                <Route path='home' element={<Home />}/>
            </Route>
        </Routes>
    )
}

export default App


