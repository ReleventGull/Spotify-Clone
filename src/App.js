import { useState } from 'react'
import LoginRegister from './components/LoginRegister'
import Access from './components/Access'
import { Routes, Route } from 'react-router-dom'
const App = () => {
    const [token, setToken] = useState(window.localStorage.getItem('token') || null)
    
    return (
        <Routes>
        <Route path='/' element={<LoginRegister />}/> 
        <Route path='/access' element={<Access />}/>
        
        </Routes>
    )
}

export default App
