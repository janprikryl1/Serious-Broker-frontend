import { FC } from "react";
import { useTranslation } from "react-i18next";
import { TbCoins, TbCandle, TbNetwork } from "react-icons/tb";
import {GlassCard} from "../reusable/GlassCard.tsx";
import InvestmentInBTC from "../../utils/icons/index/whyToInvestInCryptocurrencies/investment-in-bitcoin.svg";
import BTCTransaction from "../../utils/icons/index/whyToInvestInCryptocurrencies/bitcoin-transaction.svg";
import Graph from "../../utils/icons/index/whyToInvestInCryptocurrencies/graph.svg";

export const WhyToInvestInCryptocurrencies: FC = () => {
    const { t } = useTranslation();

    const cards = [
        {
            icon: <img src={InvestmentInBTC} alt="Create Binance account" className="tw-w-[80px]" />,
            title: t("basics.card1.title"),
            description: t("basics.card1.desc")
        },
        {
            icon: <img src={Graph} alt="Create Binance account" className="tw-w-[80px]" />,
            title: t("basics.card2.title"),
            description: t("basics.card2.desc")
        },
        {
            icon: <img src={BTCTransaction} alt="Create Binance account" className="tw-w-[80px]" />,
            title: t("basics.card3.title"),
            description: t("basics.card3.desc")
        }
    ];

    return (
        <div className="container-xxl tw-py-16 tw-mt-8 tw-mb-16">
            <h6 className="tw-text-secondary tw-font-normal tw-text-base tw-tracking-normal tw-pb-0 tw-pt-5">
                {t("BASICS")}
            </h6>
            <h2 className="mb-5 index-section-head-title">
                {t("Why Cryptocurrencies?")}
            </h2>

            {/* Responsive grid layout pre 3 kartičky */}
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-6 sm:tw-gap-14">
                {cards.map((card, idx) => (
                    <GlassCard key={idx} bgColor="var(--secondary-color)" opacity={0.15} className="tw-p-10 tw-pt-12">
                        <div className="tw-flex tw-flex-col tw-items-center tw-text-center tw-h-full tw-justify-between">
                            {/* Ikona hore */}
                            <div className="tw-mb-6 tw-flex tw-items-center tw-justify-center tw-h-16">
                                {card.icon}
                            </div>

                            {/* Nadpis kartičky */}
                            <h3 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-text-white tw-pt-8">
                                {card.title}
                            </h3>

                            {/* Popis kartičky */}
                            <p className="tw-text-base sm:tw-text-xl tw-text-gray-2 tw-m-0 tw-leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};