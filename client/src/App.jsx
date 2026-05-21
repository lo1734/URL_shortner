import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path= "/" element={<Home />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics/:code" element={<Analytics />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App