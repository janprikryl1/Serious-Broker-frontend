import {ChangeEvent, FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {TranslationsOverview} from "../../../utils/types/article/TranslationsOverview.ts";

type Props = {
    translations: TranslationsOverview[];
};

export const ArticleLanguagesSelect: FC<Props> = ({translations}) => {
    const {t} = useTranslation();
    const [language, setLanguage] = useState(translations[0].language);
    
    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="blog__meta">
            <span className={`blog__meta-tag blog__meta-tag--style1`}>
                <div className="row align-items-center">
                    <div className="col-sm-3 text-center">
                        <p className="mb-0">{t("Language")}</p>
                    </div>
                    <div className="col-sm">
                        <select className="form-select" aria-label={t("Language")} value={language} onChange={handleLanguageChange}>
                            {translations.map((translate) => (
                                <option key={translate.id} value={translate.language}>{t(translate.language)}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </span>
        </div>
    );
};
