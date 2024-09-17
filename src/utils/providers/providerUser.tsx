import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {UserType} from "../types/user/userTypes.ts";
import {isAuthenticated} from "../../api/authenticateService.ts";
import {useNavigate} from "react-router-dom";

type UserContextType = {
    user: UserType | null;
    setUser: (user: UserType) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const ProviderUser: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserType | null>(null);
    
    useEffect(() => {
        const loadIsAuthenticated = async () => {
            try {
            const result = await isAuthenticated();
            if (!result) return;
            setUser(result.data.user);
            } catch (error) {
                console.error(error);
            }
        };
        loadIsAuthenticated();
    }, []);
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate("/");
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, logout, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a ProviderUser');
    }
    return context;
};