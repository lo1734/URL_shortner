import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

function login(){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            await login(email,password);
            navigate('/dashboard');
        }catch(error){
            alert('login failed.');
        }
    }
    return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border p-8 rounded"
      >

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="w-full bg-black text-white py-3 rounded"
        >
          Login
        </button>

      </form>
    </div>
  );
}

export default login;
