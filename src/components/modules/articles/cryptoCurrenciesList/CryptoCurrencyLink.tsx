import {FC} from "react";
import {CryptoCurrencyType} from "../../../../utils/types/CryptoCurrencyType.ts";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

type Props = {
    cryptocurrency: CryptoCurrencyType;
};

export const CryptoCurrencyLink:FC<Props> = ({cryptocurrency}) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const descriptionObject = JSON.parse(cryptocurrency.description);
    const description = currentLang === 'cs' ? descriptionObject.cs : descriptionObject.en;
    
    return (
        <div className="blog__writer" style={{marginTop: 50}}>
            <div className="blog__writer-designation">
                <Link to={`/cryptocurrency_detail/${cryptocurrency.id}`} className="none">
                    {cryptocurrency.name}
                    <span style={{marginLeft: 10}}>{description}</span>
                </Link>
            </div>
        </div>
    );
};