import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { QRPayment } from "../../components/modules/profile/membershipDetails/QRPayment";
import { getMemberships } from "../../api/membershipService";
import { MembershipTypes } from "../../utils/types/user/userTypes";
import { toCzechDate } from "../../utils/constants/functions";
import { Table, TableBody, TableCell, TableHead, TableRow, Chip } from "@mui/material";
import { useThemeContext } from "../../utils/providers/ThemeProvider.tsx";
import {MembershipDetailsSkeleton} from "../../components/modules/profile/membershipDetails/MembershipDetailsSkeleton.tsx";

export const ProfileMembership: FC = () => {
    const { t } = useTranslation();
    const { theme } = useThemeContext();
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
        <>
            {loading ? (
                <MembershipDetailsSkeleton />
            ) : hasActiveMembership ? (
                <div className="padding-bottom">
                    <div className="cta__wrapper">
                        <div
                            className="text-center"
                            style={{
                                maxWidth: "500px",
                                gap: "30px",
                                backgroundColor: theme === 'dark' ? "#343a40" : "#f5f8fb",
                                borderRadius: 24,
                                padding: "30px",
                                zIndex: 2,
                                position: 'relative',
                            }}
                            data-aos="fade-up"
                            data-aos-duration="1000"
                        >
                            <div className="cta__subscribe">
                                <h2>
                                    <span>{t("My memberships")}</span>
                                </h2>
                                <p>{t("History of my memberships")}</p>
                                <Table sx={{
                                    '& th, & td': {
                                        color: theme === 'dark' ? '#ffffff' : 'inherit',
                                    },
                                }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>{t("No.")}</TableCell>
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
                                                    <TableCell>{index + 1}</TableCell>
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
                    </div>
                </div>
            ) : (
                <QRPayment />
            )}
        </>
    );
};
