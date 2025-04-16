import {FC} from "react";
import {Link} from "@mui/material";
import {useTranslation} from "react-i18next";
import {coinURL} from "../../../utils/constants";
import "../../../styles/sass/components/crypto_currencies.scss";

type Props = {
    link?: string;
}

export const CryptoCurrencyIconLink:FC<Props> = ({link}) => {
    const {t} = useTranslation();
    
    return (
        <>
            {link ? (
                <Link href={`${coinURL}/${link}`} className="crypto-currency-icon-link" target="_blank">
                    {link}
                </Link>
            ) : t("No image")}
        </>
    )
}