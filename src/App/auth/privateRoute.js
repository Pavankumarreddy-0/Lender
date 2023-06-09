import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from './useUser';
import { useEffect } from 'react';

export const PrivateRoute = () => {
    const user = useUser();
    const location = useLocation();

    useEffect(()=>{
        console.log(location);
    },[location])

    return (user && user.userType == "admin") ? <Outlet /> : <Navigate to="/admin/login" />
  
}