import {FC} from "react";
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {useTranslation} from "react-i18next";
import vsbLogo from "../utils/icons/footer/vsb_short.png";
import feiLogo from "../utils/icons/footer/fei_short.png";
import seriousInvestmentLogo from "../utils/icons/footer/SI_short_bw.png";
import {GlassCard} from "../components/reusable/GlassCard.tsx";

export const CooperationInfo: FC = () => {
    const {t} = useTranslation();

    const partners = [
        {
            name: "VSB - Technical University of Ostrava",
            shortName: "VSB–TUO",
            url: "https://www.vsb.cz/cs/",
            logo: vsbLogo,
        },
        {
            name: "Faculty of Electrical Engineering and Computer Science",
            shortName: "FEI VSB–TUO",
            url: "https://www.fei.vsb.cz/cs/index.html",
            logo: feiLogo,
        },
        {
            name: "Serious Investment s.r.o.",
            shortName: "Serious Investment",
            url: "https://www.serious-investment.cz/",
            logo: seriousInvestmentLogo,
        },
    ];

    return (
        <>
            <TitleHeader title={t("Cooperation")} />

            <div className="container tw-py-6 sm:tw-py-8">
                <div className="tw-mx-auto tw-flex tw-flex-col tw-gap-6 sm:tw-gap-8">

                    {/* Popis vývoja v GlassCard */}
                    <GlassCard bgColor="var(--true-black)" shrinkPadding={true}>
                        <div className="tw-p-4 sm:tw-p-6 md:tw-p-8 tw-text-stone-300 tw-flex tw-flex-col tw-gap-3 sm:tw-gap-4">
                            <h2 className="tw-text-lg sm:tw-text-xl md:tw-text-2xl tw-font-bold tw-text-white">
                                {t("Our Partners")}
                            </h2>
                            <p className="tw-text-sm sm:tw-text-base tw-leading-relaxed">
                                {t(
                                    "Serious Broker is a project developed in cooperation with students of VSB–TUO (FEI). It focuses on assisting with investing and raising awareness about cryptocurrencies."
                                )}
                            </p>
                            <p className="tw-text-sm sm:tw-text-base tw-leading-relaxed">
                                {t(
                                    "The project was implemented in close collaboration with the Department of Computer Science."
                                )}
                            </p>
                        </div>
                    </GlassCard>

                    {/* Zoznam partnerov ako interaktívne GlassCard karty */}
                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4 sm:tw-gap-6">
                        {partners.map((partner, index) => (
                            <a
                                key={index}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tw-block tw-h-full tw-no-underline group"
                            >
                                <GlassCard
                                    bgColor="var(--true-black)"
                                    isHoverable={true}
                                    className="tw-h-full"
                                >
                                    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-p-4 sm:tw-p-6 tw-h-full">
                                        <div className="tw-h-14 sm:tw-h-16 tw-flex tw-items-center tw-justify-center tw-mb-3 sm:tw-mb-4">
                                            <img
                                                src={partner.logo}
                                                alt={partner.shortName}
                                                className="tw-max-h-full tw-max-w-[100px] sm:tw-max-w-[120px] tw-object-contain group-hover:tw-scale-105 tw-transition-transform tw-duration-300"
                                            />
                                        </div>
                                        <span className="tw-text-sm sm:tw-text-base tw-font-semibold tw-text-white group-hover:tw-text-secondary tw-transition-colors">
                                            {t(partner.name)}
                                        </span>
                                        <span className="tw-text-[11px] sm:tw-text-xs tw-text-stone-400 tw-mt-1">
                                            {t(partner.shortName)}
                                        </span>
                                    </div>
                                </GlassCard>
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
};
