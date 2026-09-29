import {FC} from "react";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {MembershipTypes} from "../../../utils/types/user/userTypes.ts";
import {Button, ButtonColor} from "../../reusable/Button.tsx";
import {toCzechDate} from "../../../utils/functions/dateFunctions.ts";

type Props = {
    membership: MembershipTypes;
    onEdit: () => void;
};

export const MembershipComponent: FC<Props> = ({ membership, onEdit }) => {
    const { t } = useTranslation();

    return (
        <div className="mb-5 mt-3 text-light">
            <Typography>{t("Price")}: {membership.price}</Typography>
            <Typography>{toCzechDate(membership.created)} - {toCzechDate(membership.datetime_end)}</Typography>
            <Button color={ButtonColor.gray2} className="mt-2" onClick={onEdit}>
                {t("Edit")}
            </Button>
        </div>
    );
};
