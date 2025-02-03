import {Link} from "react-router-dom";
import {CSSProperties, FC} from "react";
import {useTranslation} from "react-i18next";
import {routes} from "../../../utils/constants";

type Props = {
    style?: CSSProperties;
}

export const SignInLink:FC<Props> = ({style}) => {
    const {t} = useTranslation();
    
    return (
        <Link
            to={routes.signIn}
            className="trk-btn--border trk-btn--primary link-underline-none"
            style={{ color: "black", borderRadius: "3px", fontWeight: "bold", ...style }}
        >
            {t("Sign in")}
        </Link>
    );
}