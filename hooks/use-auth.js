import React, { useState, useContext, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { selectAccount } from "@/api/member";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState("");
    const router = useRouter();
 
    const login = async (myForm) => {
        // 清除 localStorage
        localStorage.removeItem("token");
        const result = await selectAccount(myForm);
        if (result.success) {
            localStorage.setItem("token", result.token);
            setToken(result.token);
            setAuth(true);
            return true;
        } else {
            return false;
        }
    }

    const logOut = () => { 

        setToken("");
        setAuth(false);
        localStorage.removeItem("token");
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            setToken(storedToken);
            setAuth(true);
            console.log("Ddd123"+auth+token)
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ token, auth,login, logOut }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
