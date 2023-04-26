import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from './useUser';
import { useEffect } from 'react';

export const PrivateInvestorRoute = () => {
    const user = useUser();
    const location = useLocation();

    useEffect(()=>{
        console.log(location);
    },[location])

    return (user && (user.userType == "Individual Investor" || user.userType == "Corporate Investor")) ? <Outlet /> : <Navigate to="/login" />
  
}