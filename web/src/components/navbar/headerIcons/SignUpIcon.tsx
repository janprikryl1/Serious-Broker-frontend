import {FC} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {routes} from "../../../utils/constants";
import {Button, ButtonColor} from "../../reusable/Button.tsx";

export const SignUpIcon:FC = () => {
    const { t } = useTranslation();
    
    return (
        <Button type="link" to={routes.register} style={{padding: "10px", fontSize: "16px"}} className={"outline"} color={ButtonColor.transparent} fontColor={"white"}>
            {t("Register")}
        </Button>
    );
}