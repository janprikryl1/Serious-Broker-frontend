import {FC} from "react";
import {SliderPage} from "../components/index/SliderPage.tsx";
import {ShortExpressiveText} from "../components/index/ShortExpressiveText.tsx";
import {StartInvestingWithSeriousBroker} from "../components/index/StartInvestingWithSeriousBroker.tsx";
import {AssetCalculatorComponent} from "../components/index/AssetCalculatorComponent.tsx";
import {NoStressClearHeadInfo} from "../components/index/NoStressClearHeadInfo.tsx";

export const Index: FC = () => {
    return (
        <>
            <SliderPage />
            <StartInvestingWithSeriousBroker />
            <AssetCalculatorComponent />
            <ShortExpressiveText />
            <NoStressClearHeadInfo />
            {/*<GreedFearStrategies />
            <IndexPersonalStrategy />
            <GuidedInvestControl />
            <IndexInvestorGuide />
            <WhyToInvestInCryptocurrencies />*/}
            {/*<BitcoinProfitCalculator />*/}
        </>
    );
};
