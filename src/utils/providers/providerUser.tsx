import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserType } from "../types/user/userTypes.ts";
import { isAuthenticated } from "../../api/authenticateService.ts";
import { useNavigate, useLocation } from "react-router-dom";
import {PROTECTED_ROUTES} from "../constants";
import Logo from "../../utils/icons/logo/symbol.svg";

type UserContextType = {
    user: UserType | null;
    setUser: (user: UserType) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const ProviderUser: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadIsAuthenticated = async () => {
            try {
                const result = await isAuthenticated();
                if (result) {
                    setUser(result.data.user);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadIsAuthenticated();
    }, []);

    useEffect(() => {
        if (!loading) {
            const currentPath = location.pathname;
            const isProtected = PROTECTED_ROUTES.some(route => currentPath.startsWith(route.replace(':id', '')));

            if (isProtected && user === null) {
                navigate("/");
            }
        }
    }, [loading, user, location.pathname, navigate]);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate("/");
    };

    return (
        <UserContext.Provider value={{ user, logout, setUser }}>
            {loading ? (
                <div className="preloader">
                    <img src={Logo} alt="preloader icon" width={100} height={100} />
                </div>
            ) : children}
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
