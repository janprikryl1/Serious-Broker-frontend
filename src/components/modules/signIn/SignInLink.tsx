import {Link} from "react-router-dom";
import {CSSProperties, FC} from "react";
import {useTranslation} from "react-i18next";

type Props = {
    style?: CSSProperties;
}

export const SignInLink:FC<Props> = ({style}) => {
    const {t} = useTranslation();
    
    return (
        <Link
            to="/sign_in"
            className="trk-btn--border trk-btn--primary none"
            style={{ color: "black", borderRadius: "10px", ...style }}
        >
            {t("Sign in")}
        </Link>
    );
}