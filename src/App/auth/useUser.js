import { useState, useEffect } from "react";
import { useToken } from "./useToken";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
    const [token] = useToken();
    const navigate = useNavigate();


    const getPayloadFromToken = token => {
        const encodedPayload = token.split('.')[1];
        return JSON.parse(atob(encodedPayload));
    }


    const [user, setUser] = useState(() => {
        if (!token) return null;

        return getPayloadFromToken(token);
    })

    useEffect(() => {
        if (!token) {
            setUser(null)
        } else {
            let __userData = getPayloadFromToken(token);

            if (Date.now() >= __userData.exp * 1000) {
                localStorage.removeItem("token");
                navigate('/login');
                return;
            }

            setUser(__userData);
        }
    }, [token]);

    useEffect(() => {
        if (!token) {
            setUser(null)
        } else {
            let __userData = getPayloadFromToken(token);

            if (Date.now() >= __userData.exp * 1000) {
                localStorage.removeItem("token");
                navigate('/login');
                return;
            }

            setUser(__userData);
        }
    }, []);

    return user;
}