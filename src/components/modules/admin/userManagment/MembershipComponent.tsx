import { FC } from "react";
import { Button } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { toCzechDate } from "../../../../utils/constants/functions.ts";
import { MembershipTypes } from "../../../../utils/types/user/userTypes.ts";

type Props = {
    membership: MembershipTypes;
    onEdit: () => void;
};

export const MembershipComponent: FC<Props> = ({ membership, onEdit }) => {
    const { t } = useTranslation();

    return (
        <div className="mb-5 mt-3 text-white">
            <Typography>{t("Price")}: {membership.price}</Typography>
            <Typography>{toCzechDate(membership.created)} - {toCzechDate(membership.datetime_end)}</Typography>
            <Button variant="outline-secondary" className="mt-2" onClick={onEdit}>
                {t("Edit")}
            </Button>
        </div>
    );
};
