import { useState } from 'react'
import LoginRegister from './components/LoginRegister'
import { Routes, Route } from 'react-router-dom'
const App = () => {
    const [toke, setToken] = useState(window.localStorage.getItem('token') || null)
    return (
        <Routes>
        
        <Route path='account' element={<LoginRegister />} />
  
        
        </Routes>
    )
}

export default App