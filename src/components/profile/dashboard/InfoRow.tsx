import React, {FC} from "react";
import {OutlineContainer} from "../../reusable/OutlineContainer.tsx";
import {IoWalletOutline} from "react-icons/io5";
import { IoFileTrayOutline } from "react-icons/io5";
import {FiDollarSign} from "react-icons/fi";
import {LuTrendingUp, LuTrendingDown} from "react-icons/lu";
import {useTranslation} from "react-i18next";

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
        { Icon: LuTrendingUp, label: 'Active Investment Plans', value: investmentPlanSum },
        { Icon: FiDollarSign, label: 'Total Invested', value: formatAmount(totalInvested) },
        { Icon: LuTrendingDown, label: 'Active Traffic Lights',value: t('activeTrafficLights', { buy: buyTrafficLightSum, sell: sellTrafficLightSum })}
    ];

    return (
        <div className="row g-4 ">
            {cards.map((card, idx) => (
                <div key={idx} className="col-12 col-sm-6 col-lg-3">
                    <OutlineContainer className={"dashboard-container"}>
                        <div className={"d-flex align-items-center gap-3"}>
                            <div className="color-container--gold icon-container">
                                <card.Icon size={20} />
                            </div>
                            <div>
                                <div className="gray-2-color-text" style={{fontSize: '0.9rem'}}>
                                    {t(card.label)}
                                </div>
                                <div style={{fontSize: "1.1rem", fontWeight: 500}}>
                                    {card.value}
                                </div>
                            </div>
                        </div>
                    </OutlineContainer>
                </div>
            ))}
        </div>
    );
};
