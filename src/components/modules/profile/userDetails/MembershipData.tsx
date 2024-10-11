/*import {FC} from "react";
import {Link} from "react-router-dom";
import {CiSettings} from "react-icons/ci";
import {useTranslation} from "react-i18next";
import {useUserDetails} from "../../../utils/providers/UserDetailsProvider.tsx";
import {toCzechDate} from "../../../utils/constants";

export const MembershipData:FC = () => {
    const {t} = useTranslation();
    const {membershipData} = useUserDetails();

    return (
        <>
            <h1>{t("Subscription")} <Link to={"changeMembershipURL"}><CiSettings/></Link></h1>
            {membershipData && (
                <>
                    <p>{t("Type")}: {t(membershipData.type)}</p>
                    <p>{t("Price")}: {t(membershipData.payment)}</p>
                    <p>{t("Date begins")}: {toCzechDate(membershipData.date_begin)}</p>
                    <p>{t("Date ends")}: {toCzechDate(membershipData.date_end)}</p>
                </>
            )}
        </>
    );
};
*/