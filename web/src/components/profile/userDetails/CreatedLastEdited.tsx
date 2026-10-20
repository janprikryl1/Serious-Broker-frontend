import {useTranslation} from "react-i18next";
import {useUserDetails} from "../../../utils/providers/UserDetailsProvider.tsx";
import {toCzechDateFormat} from "../../../utils/functions/dateFunctions.ts";

export const CreatedLastEdited = () => {
    const {t} = useTranslation();
    const {userDetails} = useUserDetails();

    if (userDetails !== undefined) {
        return (
            <>
                <h3 className="tw-mb-4 tw-text-lg sm:tw-text-xl lg:tw-text-2xl">{t("Created and last changes")}</h3>
                <p className="tw-mb-2 tw-text-sm sm:tw-text-base">{t("Created")}: {toCzechDateFormat(userDetails.created)}</p>
                <p className="tw-text-sm sm:tw-text-base">{t("Last changes at profile")}: {toCzechDateFormat(userDetails.changed)}</p>
            </>
        );
    }
};
