import {useTranslation} from "react-i18next";
import {FC} from "react";
import {useUserDetails} from "../../../utils/providers/UserDetailsProvider.tsx";
import {Button} from "../../reusable/Button.tsx";

export const UploadChangesButton:FC = () => {
    const {t} = useTranslation();
    const {submitChanges} = useUserDetails();

    return (
        <Button type="submit" className="mt-4 tw-w-full sm:tw-w-auto tw-text-sm sm:tw-text-base" onClick={submitChanges}>{t("Upload changes")}</Button>
    );
}
