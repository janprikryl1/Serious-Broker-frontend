import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { QRPayment } from "../../components/modules/profile/membershipDetails/QRPayment";
import { getMemberships } from "../../api/membershipService";
import { MembershipTypes } from "../../utils/types/user/userTypes";
import { toCzechDate } from "../../utils/constants/functions";
import {Table, TableBody, TableCell, TableHead, TableRow, Chip, useMediaQuery} from "@mui/material";
import { useThemeContext } from "../../utils/providers/ThemeProvider.tsx";
import {MembershipDetailsSkeleton} from "../../components/modules/profile/membershipDetails/MembershipDetailsSkeleton.tsx";

export const ProfileMembership: FC = () => {
    const { t } = useTranslation();
    const { theme } = useThemeContext();
    const isDesktop = useMediaQuery('(max-width:768px)');
    const [memberships, setMemberships] = useState<MembershipTypes[]>([]);
    const [hasActiveMembership, setHasActiveMembership] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMemberships = async () => {
            setLoading(true);
            const response = await getMemberships();
            if (!response) {
                setLoading(false);
                return;
            }
            const membershipsData = response.data;
            setMemberships(membershipsData);

            const currentDate = new Date();
            const activeMembershipExists = membershipsData.some(membership =>
                new Date(membership.datetime_end) >= currentDate
            );
            setHasActiveMembership(activeMembershipExists);
            setLoading(false);
        };
        fetchMemberships();
    }, []);

    return (
        <div className="cta__wrapper">
            {loading ? (
                <MembershipDetailsSkeleton />
            ) : hasActiveMembership ? (
                <div className="padding-bottom">
                        <div
                            className="text-center"
                            style={{
                                maxWidth: "600px",
                                backgroundColor: theme === 'dark' ? "#211f1b" : "#f5f8fb",
                                borderRadius: 24,
                                padding: "5vw",
                                zIndex: 2,
                                position: 'relative',
                            }}
                            data-aos="fade-up"
                            data-aos-duration="1000"
                        >
                                <h2 className="asset-title">{t("My memberships")}</h2>
                                <p style={{fontSize: 25}}>{t("History of my memberships")}</p>
                                <Table sx={{
                                    '& th, & td': {
                                        color: theme === 'dark' ? '#ffffff' : 'inherit',
                                    },
                                }}>
                                    <TableHead>
                                        <TableRow>
                                            {isDesktop && <TableCell>{t("No.")}</TableCell>}
                                            <TableCell>{t("Price")}</TableCell>
                                            <TableCell>{t("Valid from")}</TableCell>
                                            <TableCell>{t("Valid to")}</TableCell>
                                            <TableCell>{t("Status")}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {memberships.map((membership, index) => {
                                            const isActive = new Date(membership.datetime_end) > new Date();
                                            return (
                                                <TableRow key={membership.id}>
                                                    {isDesktop && <TableCell>{index + 1}</TableCell>}
                                                    <TableCell>{membership.price}</TableCell>
                                                    <TableCell>{toCzechDate(membership.created)}</TableCell>
                                                    <TableCell>{toCzechDate(membership.datetime_end)}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={isActive ? t("Active") : t("Expired")}
                                                            color={isActive ? "success" : "error"}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                        </div>
                </div>
            ) : (
                <QRPayment />
            )}
        </div>
    );
};
