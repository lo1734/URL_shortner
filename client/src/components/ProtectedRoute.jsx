import { useNavigate } from 'react-router-dom';
import { useAuth }  from '../context/AuthContext';

function ProtectedRoute({ children }){
    const {user, loading} = useAuth();
    const navigate = useNavigate();
    if(loading) {
        return <div> Loading... </div>;
    }
    if(!user){
         navigate('/login');
         return;
    }
    return children;
}

export default ProtectedRoute;