import {
        createContext,
        useContext,
        useEffect,
        useState,
    } from 'react';
import api from '../services/api';

const AuthContext = createContext();
export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    async function loadUser(){
        const token = localStorage.getItem('token');
        if(!token){
            setLoading(false);
            return;
        }
        try{
            const response = await api.get('/me');
            setUser(response.data.user);
        }catch(error){
            localStorage.removeItem('token');
            setUser(null);
        }
        setLoading(false);
    }
    useEffect(()=>{
        loadUser();
    },[]);
    async function login(email,password){
        const response = await api.post(
            '/auth/login',
            {
                email,
                password,
            }
        );
        localStorage.setitem(
            'token',
            response.data.token
        );
        setUser(response.data.user);
    }

    async function register(email,password){
        await api.post(
            '/auth/register',
            {
                email,
                password,
            },
        );
    }

    function logout(){
        localStorage.removeItem('token');
        setUser(null);
    }
    return (
        <AuthContext.Provider
            value = {{
                user,
                login,
                register,
                logout,
                loading,
            }}
        >
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}