import {FC} from "react";
import {Link} from "@mui/material";
import {useTranslation} from "react-i18next";
import {coinURL} from "../../../../utils/constants";

type Props = {
    link?: string;
}

export const CryptoCurrencyIconLink:FC<Props> = ({link}) => {
    const {t} = useTranslation();
    
    return (
        <>
            {link ? (
                <Link href={`${coinURL}/${link}`} style={{color: "#fac900", textDecoration:"none"}} target="_blank">
                    {link}
                </Link>
            ) : t("No image")}
        </>
    )
}