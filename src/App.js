import { useState, useEffect,  } from 'react'
import Access from './Access'
import { LoginRegister, Profile } from './components/index'
import { Routes, Route, useNavigate } from 'react-router-dom'


const App = () => {
    const navigate = useNavigate()
    const [theme, setTheme] = useState('black')
    useEffect(() => {
        /*****Checking to make sure that the redirect includes the code */
        const url = window.location.href
        if (url.includes('code=')) return
        
        let checkAuth = localStorage.getItem('authorization')
        if (checkAuth) {
            navigate('/')
        }else {
            navigate('/access')
        }
   
        }, [])
        
  
    return (
        <Routes>
        <Route path='/access' element={<Access />}/>
        <Route path='/' element={<Profile theme={theme} />}/> 
        
        
        </Routes>
    )
}

export default App
