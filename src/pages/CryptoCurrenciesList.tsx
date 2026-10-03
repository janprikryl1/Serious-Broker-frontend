import {FC} from "react";
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {CryptoCurrencies} from "../components/articles/cryptoCurrenciesList/CryptoCurrencies.tsx";
import {SEO} from "../components/reusable/SEO.tsx";
import {getBreadcrumbSchema} from "../utils/functions/seoSchemas.ts";
import {routes} from "../utils/constants";
import {useTranslation} from "react-i18next";

export const CryptoCurrenciesList:FC = () => {
    const {t} = useTranslation();

    const schemas = [
        getBreadcrumbSchema([
            { name: "Domů", url: routes.home },
            { name: t("Cryptocurrencies List") || "Seznam kryptoměn", url: routes.cryptocurrenciesList },
        ]),
    ];

    return (
        <>
            <SEO
                title={t("Cryptocurrencies List") || "Seznam kryptoměn"}
                description="Aktuální přehled, kurzy a statistiky kryptoměn. Sledujte tržní kapitalizaci, cenové trendy a investiční doporučení."
                canonicalPath={routes.cryptocurrenciesList}
                schema={schemas}
            />
            <TitleHeader title="Cryptocurrencies List"/>
            <div className="container padding-bottom">
                <CryptoCurrencies />
            </div>
        </>
    );
};