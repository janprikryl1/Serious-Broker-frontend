import {FC} from 'react'
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {AboutUs} from "../../components/about/AboutUs.tsx";
import {ContactUs} from "../../components/about/ContactUs.tsx";
import {WarningOfRisks} from "../../components/navbar/WarningOfRisks.tsx";
import {SEO} from "../../components/reusable/SEO.tsx";
import {getAboutPageSchema, getBreadcrumbSchema} from "../../utils/functions/seoSchemas.ts";
import {routes} from "../../utils/constants";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {GlassCard} from "../../components/reusable/GlassCard.tsx";

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
            <section className="container tw-mt-10">
                <GlassCard bgColor="var(--true-black)" shrinkPadding={true}>
                    <div className="tw-flex tw-flex-col tw-items-start tw-gap-4 tw-p-5 sm:tw-p-7">
                        <h2 className="tw-m-0 tw-p-0 tw-text-xl tw-font-bold tw-text-white sm:tw-text-2xl">
                            {t("About the project")}
                        </h2>
                        <p className="tw-m-0 tw-text-sm tw-leading-relaxed tw-text-stone-300 sm:tw-text-base">
                            {t("about.project_description")}
                        </p>
                        <Link
                            to={routes.cooperationInfo}
                            className="tw-font-semibold tw-text-secondary tw-underline hover:tw-text-white"
                        >
                            {t("about.cooperation_info")}
                        </Link>
                    </div>
                </GlassCard>
            </section>
            <ContactUs />
            <WarningOfRisks />
        </>
    )
}