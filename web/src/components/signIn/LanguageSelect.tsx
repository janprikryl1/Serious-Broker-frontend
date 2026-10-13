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
            <label htmlFor="name" className="form-label tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-stone-200 sm:tw-text-base">{t("Language")}</label>
            <select className="form-select tw-min-h-[44px] tw-text-sm sm:tw-text-base" aria-label={t("Language")} value={value} onChange={(e) => setLanguage(e.target.value)}>
                {languages.map((country, index) => (
                    <option key={index} value={country.id}>{t(country.name)}</option>)
                )}
            </select>
        </div>
    )
};
