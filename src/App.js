import { useState, useEffect,  } from 'react'
import Access from './Access'
import { LoginRegister, Profile, Callback } from './components/index'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { fetchProfile } from './api'

const App = () => {
    const navigate = useNavigate()
    const [theme, setTheme] = useState('black')

    
    const checkToken = async() => {
        const url = window.location.href
        if (url.includes('code=')) return
        let auth = localStorage.getItem('authorization')
        if (auth) {
            console.log(auth)
            const response = await fetchProfile(auth)
            console.log(response)
            if (response.error) {
                localStorage.removeItem('authorization')
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
            <Route path='/callback' element={<Callback />}/>
        <Route path='/access' element={<Access />}/>
        <Route path='/profile' element={<Profile theme={theme} />}/> 
        
        
        </Routes>
    )
}

export default App
