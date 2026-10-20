import {FC} from "react";
import {useTranslation} from "react-i18next";
import {TbCoins, TbCandle, TbNetwork} from "react-icons/tb";
import {GlassCard} from "../reusable/GlassCard.tsx";
import InvestmentInBTC from "../../utils/icons/index/whyToInvestInCryptocurrencies/investment-in-bitcoin.svg";
import BTCTransaction from "../../utils/icons/index/whyToInvestInCryptocurrencies/bitcoin-transaction.svg";
import Graph from "../../utils/icons/index/whyToInvestInCryptocurrencies/graph.svg";

export const WhyToInvestInCryptocurrencies: FC = () => {
  const {t} = useTranslation();

  const cards = [
    {
      icon: <img src={InvestmentInBTC} alt="Create Binance account"
                 className="tw-h-[80px] tw-w-[80px] tw-object-contain"/>,
      title: t("basics.card1.title"),
      description: t("basics.card1.desc")
    },
    {
      icon: <img src={Graph} alt="Create Binance account" className="tw-h-[80px] tw-w-[80px] tw-object-contain"/>,
      title: t("basics.card2.title"),
      description: t("basics.card2.desc")
    },
    {
      icon: <img src={BTCTransaction} alt="Create Binance account"
                 className="tw-h-[80px] tw-w-[80px] tw-object-contain"/>,
      title: t("basics.card3.title"),
      description: t("basics.card3.desc")
    }
  ];

  return (
    <div className="container tw-mt-8 tw-mb-12 tw-px-4 tw-py-10 sm:tw-mb-16 sm:tw-px-6 sm:tw-py-14 lg:tw-py-16">
      <h6 className="tw-pb-0 tw-pt-5 tw-text-xs tw-font-normal tw-tracking-normal tw-text-secondary sm:tw-text-base">
        {t("BASICS")}
      </h6>
      <h2 className="index-section-head-title tw-mb-5 tw-text-2xl sm:tw-text-3xl md:tw-text-5xl lg:tw-text-6xl">
        {t("Why Cryptocurrencies?")}
      </h2>

      <div className="tw-grid tw-grid-cols-1 tw-justify-items-center tw-gap-6 tw-items-stretch sm:tw-gap-8 lg:tw-grid-cols-3 lg:tw-gap-10">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="tw-flex tw-h-full tw-w-full tw-justify-center"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-offset="250"
            data-aos-easing="ease-out-cubic"
            style={{ height: "100%" }}
          >
            <GlassCard
              bgColor="var(--secondary-color)"
              opacity={0.15}
              className="tw-flex tw-h-full tw-w-full tw-max-w-lg tw-flex-col tw-p-6 tw-pt-8 sm:tw-p-8 sm:tw-pt-10 lg:tw-p-10 lg:tw-pt-12"
              style={{ height: "100%", width: "100%" }}
            >
              <div className="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-between tw-text-center">
                <div
                  className="tw-mb-4 tw-mt-5 tw-flex tw-h-20 tw-w-full tw-items-center tw-justify-center sm:tw-mb-6 lg:tw-mt-0"
                >
                  {card.icon}
                </div>

                <h3 className="tw-pt-4 tw-text-lg tw-font-bold tw-text-white sm:tw-text-xl lg:tw-text-2xl">
                  {card.title}
                </h3>

                <p className="tw-m-0 tw-leading-relaxed tw-text-sm tw-text-gray-2 sm:tw-text-base lg:tw-text-xl">
                  {card.description}
                </p>
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
};