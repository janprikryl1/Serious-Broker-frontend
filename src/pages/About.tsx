import {FC} from 'react'
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {AboutUs} from "../components/about/AboutUs.tsx";
import {ContactUs} from "../components/about/ContactUs.tsx";
import {WarningOfRisks} from "../components/navbar/WarningOfRisks.tsx";
import {SEO} from "../components/reusable/SEO.tsx";
import {getAboutPageSchema, getBreadcrumbSchema} from "../utils/functions/seoSchemas.ts";
import {routes} from "../utils/constants";
import {useTranslation} from "react-i18next";

export const About:FC = () => {
    const {t} = useTranslation();

    const schemas = [
        getAboutPageSchema(),
        getBreadcrumbSchema([
            { name: "Domů", url: routes.home },
            { name: t("About us") || "O nás", url: routes.about },
        ]),
    ];

    return (
        <>
            <SEO
                title={t("About us") || "O nás"}
                description="O projektu Serious Broker – studentský projekt zaměřený na asistenci při investování a šíření povědomí o kryptoměnách."
                canonicalPath={routes.about}
                schema={schemas}
            />
            <TitleHeader title="About us"/>
            <div className="container">
                <AboutUs />
            </div>
            <ContactUs />
            <WarningOfRisks />
        </>
    )
}