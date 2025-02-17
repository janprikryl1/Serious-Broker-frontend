import {createContext, useContext, useState, useEffect, ReactNode, FC} from 'react';
import { UserType } from "../types/user/userTypes.ts";
import { isAuthenticated } from "../../api/authenticateService.ts";
import { useNavigate, useLocation } from "react-router-dom";
import {PROTECTED_ROUTES, routes} from "../constants";
import {Preloader} from "../../Preloader.tsx";

type Props = {
    children: ReactNode 
}

type UserContextType = {
    user: UserType | undefined;
    setUser: (user: UserType) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const ProviderUser: FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState<UserType>();
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

            if (isProtected && user === undefined) {
                navigate(routes.home);
            }
        }
    }, [loading, user, location.pathname, navigate]);

    const logout = () => {
        setUser(undefined);
        localStorage.removeItem('token');
        navigate(routes.home);
    };

    return (
        <UserContext.Provider value={{ user, logout, setUser }}>
            {loading ? <Preloader /> : children}
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
