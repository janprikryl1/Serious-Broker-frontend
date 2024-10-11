import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import {FC} from "react";
import {useUserDetails} from "../../../../utils/providers/UserDetailsProvider.tsx";

export const UploadChangesButton:FC = () => {
    const {t} = useTranslation();
    const {sumbitChanges} = useUserDetails();

    return (
        <Button type="submit" className="mt-4" onClick={sumbitChanges}>{t("Upload changes")}</Button>
    );
}
