import {FC} from "react";
import {useTranslation} from "react-i18next";
import {countries} from "../../utils/options/countries.ts";

type Props = {
    value?: string;
    setCountry: (country: string) => void;
};

export const CountrySelect:FC<Props> = ({value, setCountry}) => {
    const {t} = useTranslation();

    return (
        <div className="form-outline">
            <label htmlFor="name" className="form-label tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-stone-200 sm:tw-text-base">{t("Country")}</label>
            <select className="form-select tw-min-h-[44px] tw-text-sm sm:tw-text-base" aria-label={t("Country")} value={value} onChange={(e) => setCountry(e.target.value)}>
                {countries.map((country, index) => (
                    <option key={index} value={country.id}>{t(country.name)}</option>)
                )}
            </select>
        </div>
    )
};
