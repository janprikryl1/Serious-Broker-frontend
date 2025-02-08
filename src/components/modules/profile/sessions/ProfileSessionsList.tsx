import { FC, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery } from "@mui/material";
import { SessionType } from "../../../../utils/types/user/sessionType";
import {getProfileSessions, logoutEverywhere, logoutSession} from "../../../../api/profileSessionService";
import { useThemeContext } from "../../../../utils/providers/ThemeProvider";
import {Button} from "../../../Button.tsx";
import {useTranslation} from "react-i18next";
import {useUserContext} from "../../../../utils/providers/providerUser.tsx";

export const ProfileSessionsList: FC = () => {
    const { t } = useTranslation();
    const { theme } = useThemeContext();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [sessions, setSessions] = useState<SessionType[]>([]);
    const {logout} = useUserContext();
    
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const res = await getProfileSessions();
                if (!res) return;
                setSessions(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchSessions();
    }, []);

    const handleLogout = async (sessionId: number) => {
        const res = await logoutSession(sessionId);
        if (!res || res.status !== 200) return;
        if (res.data.deleteToken === "this") {
            logout();
            return;
        }
        setSessions(prev => prev.filter(session => session.id !== sessionId));
    };

    const handleLogoutEverywhere = async () => {
       await logoutEverywhere();
       setSessions([]);
        logout();
    };

    return (
        <div className="padding-bottom">
            <h2 className="asset-title">{t("Profile Sessions")}</h2>
            <p>{t("List of your active and past login sessions.")}</p>
            <Table sx={{
                '& th, & td': {
                    color: theme === 'dark' ? '#ffffff' : 'inherit',
                },
            }}>
                <TableHead>
                    <TableRow>
                        {!isMobile && <TableCell>ID</TableCell>}
                        <TableCell>{t("Created")}</TableCell>
                        <TableCell>{t("IP Address")}</TableCell>
                        <TableCell>{t("Action")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sessions.map((session) => (
                        <TableRow key={session.id}>
                            {!isMobile && <TableCell>{session.id}</TableCell>}
                            <TableCell>{session.created}</TableCell>
                            <TableCell>{session.ip_address}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleLogout(session.id)}>{t("Logout")}</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button className="mt-3" onClick={handleLogoutEverywhere}>{t("Logout Everywhere")}</Button>
        </div>
    );
};
