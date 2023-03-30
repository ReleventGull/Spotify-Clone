import { useState, useEffect,  } from 'react'
import LoginRegister from './components/LoginRegister'
import Access from './components/Access'
import { Routes, Route, useNavigate } from 'react-router-dom'


const App = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        /*****Checking to make sure that the redirect includes the code */
        const url = window.location.href
        if (url.includes('code=')) return
        
        let checkAuth = localStorage.getItem('authorization')
        if (checkAuth) {
            navigate('/login')
        }else {
            navigate('/access')
        }
   
        }, [])
        
  
    return (
        <Routes>
        <Route path='/login' element={<LoginRegister />}/> 
        <Route path='/access' element={<Access />}/>
        
        </Routes>
    )
}

export default App
