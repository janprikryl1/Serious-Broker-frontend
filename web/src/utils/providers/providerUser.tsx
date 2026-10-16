import {createContext, useContext, useState, useEffect, ReactNode, FC, Dispatch, SetStateAction} from 'react';
import { UserType } from "../types/user/userTypes.ts";
import { useNavigate, useLocation } from "react-router-dom";
import {PROTECTED_ROUTES, routes} from "../constants";
import {Preloader} from "../../Preloader.tsx";
import {isAuthenticated} from "../api/authenticateService.ts";
import {UserFormFillModal} from "../../components/formQuestions/UserFormFillModal.tsx";
import {identifyUser, resetUser} from "../posthog.ts";

type Props = {
    children: ReactNode 
}

type UserContextType = {
    user: UserType | undefined;
    setUser: (user: UserType | undefined) => void;
    logout: () => void;
    setFilledForm: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const ProviderUser: FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState<UserType>();
    const [loading, setLoading] = useState(true);
    const [filledForm, setFilledForm] = useState(false);

    useEffect(() => {
        const loadIsAuthenticated = async () => {
            try {
                const result = await isAuthenticated();
                if (result) {
                    setUser(result.data.user);
                    setFilledForm(result.data.user.has_filled_form !== true);
                    identifyUser(result.data.user.id, {
                        email: result.data.user.email,
                        nickname: result.data.user.nickname,
                        role: result.data.user.role,
                    });
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
        resetUser();
        navigate(routes.home);
    };

    return (
        <UserContext.Provider value={{ user, logout, setUser, setFilledForm }}>
            {loading ? 
                <Preloader /> 
                : (
                    <>
                        {children}
                        {/*{filledForm && <UserFormFillModal />}*/}
                    </>
                )}
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
