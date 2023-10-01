import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Quiz from './components/Quiz'
import Result from './components/Result'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'

function PrivateRoute({ authenticated, children }) {
    const navigate = useNavigate()

    if (localStorage.getItem('sessionKey')) {
        authenticated = true
    }

    useEffect(() => {
        if (!authenticated) {
        navigate('/login');
        }
    }, [authenticated, navigate])

    return authenticated ? children : null
}

function App() {
    const [authenticated, setAuthenticated] = useState(false)

  return (
    <Router>
        <Routes>
            <Route path='/login' element={<Login setAuthenticated={setAuthenticated} />} />
            <Route path='/' element={<PrivateRoute authenticated={authenticated}><Quiz /></PrivateRoute>} />
            <Route path='/result' element={<PrivateRoute authenticated={authenticated}><Result /></PrivateRoute>} />
        </Routes>
    </Router>
  )
}

export default App
