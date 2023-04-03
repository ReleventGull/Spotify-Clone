import { useState, useEffect,  } from 'react'
import Access from './Access'
import { LoginRegister, Callback, Profile } from './components/index'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { fetchProfile } from './api'
import Application from './Application'
const App = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState(window.localStorage.getItem('authorization') || '')
    const [theme, setTheme] = useState('black')

    
    const checkToken = async() => {
        const url = window.location.href
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
        <Route path='access' element={<Access token={token} />}/>
            <Route path='spotify/*' element={<Application theme={theme} />}>
                <Route path='profile'  element={<Profile />}/>
            </Route>
        </Routes>
    )
}

export default App
