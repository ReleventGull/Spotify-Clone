import { useState, useEffect,  } from 'react'
import Access from './Access'
import { LoginRegister, Profile } from './components/index'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { fetchProfile } from './api'

const App = () => {
    const navigate = useNavigate()
    const [theme, setTheme] = useState('black')
    const [auth, setAuth] = useState(localStorage.getItem('authorization') || '')
    
    const checkToken = async() => {
        const url = window.location.href
        if (url.includes('code=')) return
        if (auth) {
            const response = await fetchProfile(auth)
            console.log(response)
            if (response.error) {
                localStorage.removeItem('authorization')
                navigate('/access')
            }else {
                navigate('/')
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
        <Route path='/access' element={<Access />}/>
        <Route path='/' element={<Profile auth={auth} theme={theme} />}/> 
        
        
        </Routes>
    )
}

export default App
