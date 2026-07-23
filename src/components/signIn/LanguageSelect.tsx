import {FC} from "react";
import {useTranslation} from "react-i18next";
import {languages} from "../../utils/options/languages.ts";

type Props = {
    value?: string;
    setLanguage: (country: string) => void;
};

export const LanguageSelect:FC<Props> = ({value, setLanguage}) => {
    const {t} = useTranslation();

    return (
        <div className="form-outline">
            <label htmlFor="name" className="form-label mb-3">{t("Language")}</label>
            <select className="form-select" aria-label={t("Language")} value={value} onChange={(e) => setLanguage(e.target.value)}>
                {languages.map((country, index) => (
                    <option key={index} value={country.id}>{t(country.name)}</option>)
                )}
            </select>
        </div>
    )
};
