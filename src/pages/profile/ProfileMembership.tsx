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
    const isMobile = useMediaQuery('(max-width:768px)');
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
        <div className="padding-bottom">
            <div className="service-details__item">
                <div className="service-details__item-inner">
                    <div
                        className="service-details__content"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        {loading ? (
                            <MembershipDetailsSkeleton />
                        ) : hasActiveMembership ? (
                            <>
                                <h2 className="asset-title">{t("My memberships")}</h2>
                                <p>{t("History of my memberships")}</p>
                                <Table sx={{
                                    '& th, & td': {
                                        color: theme === 'dark' ? '#ffffff' : 'inherit',
                                    },
                                }}>
                                    <TableHead>
                                        <TableRow>
                                            {!isMobile && <TableCell>{t("No.")}</TableCell>}
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
                                                    {!isMobile && <TableCell>{index + 1}</TableCell>}
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
                            </>
                        ) : (
                            <QRPayment />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
