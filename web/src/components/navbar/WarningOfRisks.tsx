import {FC} from "react";
import {useTranslation} from "react-i18next";

export const WarningOfRisks:FC = () => {
    const {t} = useTranslation();
    
    return (
      <div className="container tw-my-6 tw-text-stone-300 tw-mt-20">
        <h5 className="tw-font-bold tw-text-lg tw-mb-3 tw-tracking-wide">
          {t("RISK WARNING")}
        </h5>

        <div className="tw-flex tw-flex-col tw-gap-3 tw-text-sm tw-leading-relaxed">
          <p>
            {t(
              "As with any asset, the value of digital assets can fluctuate significantly and there is a substantial risk of economic loss when buying, selling, holding or investing in digital assets. You should therefore consider whether trading or holding digital assets is suitable for you in light of your financial situation."
            )}
          </p>

          <p>
            {t(
              "We are not your broker, intermediary, agent or advisor and we have no fiduciary relationship or obligation to you in connection with any transactions or other activities you undertake while using our Services. We do not provide investment or advisory advice of any kind, and no communication or information we provide to you is intended or should be construed as advice of any kind."
            )}
          </p>

          <p>
            {t(
              "It is your responsibility to determine whether any investment, investment strategy or related transaction is appropriate for you according to your personal investment objectives, financial situation and risk tolerance, and you are responsible for any associated loss or liability. We do not recommend that any digital asset should be bought, earned, sold or held by you. Before making the decision to buy, sell or hold any digital asset, you should consult your financial advisor. We are not responsible for the decisions you make to buy, earn, sell or hold digital assets based on the information provided by us, including any losses you incur as a result of those decisions."
            )}
          </p>
        </div>
      </div>
    );
}