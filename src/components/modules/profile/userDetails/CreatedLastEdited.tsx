import {useTranslation} from "react-i18next";
import {useUserDetails} from "../../../../utils/providers/UserDetailsProvider.tsx";
import {toCzechDateFormat} from "../../../../utils/constants/functions.ts";

export const CreatedLastEdited = () => {
    const {t} = useTranslation();
    const {userDetails} = useUserDetails();

    if (userDetails !== null) {
        return (
            <>
                <h3>{t("Created and last changes")}</h3>
                <p>{t("Created")}: {toCzechDateFormat(userDetails.created)}</p>
                <p>{t("Last changes at profile")}: {toCzechDateFormat(userDetails.changed)}</p>
            </>
        );
    }
};
