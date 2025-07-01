import {FC} from "react";
import {SliderPage} from "../components/index/SliderPage.tsx";
import {ShortExpressiveText} from "../components/index/ShortExpressiveText.tsx";
import {IndexPersonalStrategy} from "../components/index/IndexPersonalStrategy.tsx";
import {GuidedInvestControl} from "../components/index/GuidedInvestControl.tsx";
import {IndexInvestorGuide} from "../components/index/IndexInvestorGuide.tsx";
import {StartInvestingWithSeriousBroker} from "../components/index/StartInvestingWithSeriousBroker.tsx";
import {WhyToInvestInCryptocurrencies} from "../components/index/WhyToInvestInCryptocurrencies.tsx";
import {GreedFearStrategies} from "../components/index/GreedFearStrategies.tsx";

export const Index: FC = () => {
    return (
        <>
            <SliderPage />
            <ShortExpressiveText />
            <GreedFearStrategies />
            <IndexPersonalStrategy />
            <GuidedInvestControl />
            <IndexInvestorGuide />
            <StartInvestingWithSeriousBroker />
            <WhyToInvestInCryptocurrencies />
            {/*<BitcoinProfitCalculator />*/}
        </>
    );
};
