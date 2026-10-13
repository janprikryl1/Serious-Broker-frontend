import React, {FC} from "react";
import {IoFileTrayOutline} from "react-icons/io5";
import {FiDollarSign} from "react-icons/fi";
import {AiOutlineFundProjectionScreen} from "react-icons/ai";
import {FaTrafficLight} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import {CustomTooltip} from "../../reusable/CustomTooltip.tsx";

type Props = {
    portfolioSum?: number | undefined;
    investmentPlanSum? : number | undefined;
    totalInvested?: number | undefined;
    buyTrafficLightSum?: number | undefined;
    sellTrafficLightSum?: number | undefined;
}

export const InfoRow: FC<Props> = ({ portfolioSum, investmentPlanSum, totalInvested, buyTrafficLightSum, sellTrafficLightSum }) => {
    const {t} = useTranslation();
    const formatAmount = (value?: number) => value !== undefined && value !== null ? `${value.toLocaleString()} EUR` : "-";

    const cards = [
        { Icon: IoFileTrayOutline, label: 'Active Portfolios', value: portfolioSum },
        { Icon: AiOutlineFundProjectionScreen, label: 'Active Investment Plans', value: investmentPlanSum },
        { Icon: FiDollarSign, label: 'Total Invested', value: formatAmount(totalInvested) },
        { Icon: FaTrafficLight, label: 'Active Traffic Lights',value: t('activeTrafficLights', { buy: buyTrafficLightSum, sell: sellTrafficLightSum })}
    ];

    // t('Estimated total investment from your plans')

    return (
        <div className="row g-3 lg:g-4">
            {cards.map((card, idx) => (
                <CustomTooltip key={idx} title={`${card.label === 'Total Invested' ? t('estimatedTotalInvestment') : ''}`} placement={'top'}>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="tw-bg-stone-950 tw-bg-opacity-5 tw-border tw-border-solid tw-border-stone-400 tw-border-opacity-20 tw-rounded-2xl tw-p-3 sm:tw-p-4">
                            <div className={"d-flex align-items-center gap-3 tw-min-w-0"}>
                                <div className="color-container--gold icon-container">
                                    <card.Icon size={20} />
                                </div>
                                <div className="tw-min-w-0">
                                    <div className="gray-2-color-text tw-text-xs sm:tw-text-sm tw-leading-tight">
                                        {t(card.label)}
                                    </div>
                                    <div className="tw-text-sm sm:tw-text-base lg:tw-text-lg tw-font-medium tw-break-words tw-leading-snug">
                                        {card.value}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomTooltip>
            ))}
        </div>
    );
};
