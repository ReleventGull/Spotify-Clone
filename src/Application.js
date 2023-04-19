import { useState, useEffect,  } from 'react'
import Access from './Access'
import { LoginRegister, Callback, Profile, Home } from './components/index'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { fetchProfile,  } from './api'
import NavBar from './NavBar'
const App = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState(window.localStorage.getItem('authorization') || null)

    
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

   
  
    return (
        <Routes>
        <Route path='callback' element={<Callback />}/>
        <Route path='access' element={<Access />}/>
            <Route path='spotify/*' element={<NavBar />}>
                <Route path='profile'  element={<Profile />}/>
                <Route path='home' element={<Home />}/>
                
            </Route>
        </Routes>
    )
}

export default App


