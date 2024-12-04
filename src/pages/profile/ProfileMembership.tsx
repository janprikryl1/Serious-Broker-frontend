import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { QRPayment } from "../../components/modules/profile/membershipDetails/QRPayment.tsx";
import { getMemberships } from "../../api/membershipService.ts";
import { MembershipTypes } from "../../utils/types/user/userTypes.ts";

export const ProfileMembership: FC = () => {
    const { t } = useTranslation();
    const [memberships, setMemberships] = useState<MembershipTypes[]>([]);
    const [hasActiveMembership, setHasActiveMembership] = useState(false);

    useEffect(() => {
        const fetchMemberships = async () => {
            const response = await getMemberships();
            if (!response) return;
            const membershipsData = response.data;
            setMemberships(membershipsData);

            const currentDate = new Date();
            const activeMembershipExists = membershipsData.some(membership =>
                new Date(membership.date_time_end) >= currentDate
            );
            setHasActiveMembership(activeMembershipExists);
        };
        fetchMemberships();
    }, []);

    return (
        <div className="padding-bottom">
            {hasActiveMembership ? (
                <div>
                    <h3>{t('Your Memberships')}</h3>
                    <ul>
                        {memberships.map(membership => (
                            <li key={membership.id}>
                                {t('Membership ID')}: {membership.id}, {t('Price')}: {membership.price}, {t('Valid Until')}: {new Date(membership.date_time_end).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <QRPayment />
            )}
        </div>
    );
};