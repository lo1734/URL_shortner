import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import ProtectedRoute from './components/ProtectedRoute';

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path= "/" element={<Home />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
                <Route path="/analytics/:code" element={<Analytics />} />
{/*                 <Route path="/dashboard" element = {<Dashboard />}> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App