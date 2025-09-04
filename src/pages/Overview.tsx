import {FC} from "react";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import { NowTrending } from "../components/overview/NowTrending.tsx";
import {NewToInvesting} from "../components/overview/NewToInvesting.tsx";
import {Newsletter} from "../components/overview/Newsletter.tsx";
import {SignUpBanner} from "../components/overview/SignUpBanner.tsx";
import {LookingForMoreInDepthStatistics} from "../components/overview/LookingForMoreInDepthStatistics.tsx";
import {OverviewTableData} from "../components/overview/overviewTableData/OverviewTableData.tsx";
import {BitcoinProfitCalculator} from "../components/index/BitcoinProfitCalculator.tsx";
import "../styles/sass/components/overview.scss";

export const Overview:FC = () => {
    const {user} = useUserContext();

    return (
        <div className="container">
            <NowTrending />
            <NewToInvesting />
            {!user && (
                <Newsletter/>
            )}
            <OverviewTableData />
            {!user && (
                <>
                    <LookingForMoreInDepthStatistics />
                    <BitcoinProfitCalculator />
                    <SignUpBanner />
                </>
            )}
        </div>
    );
};