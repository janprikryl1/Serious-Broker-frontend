import {FC} from "react";
import {SliderPage} from "../components/index/SliderPage.tsx";
import {SloganSection} from "../components/index/SloganSection.tsx";
import {InvestWithUs} from "../components/index/InvestWithUs.tsx";
import {RegisterSection} from "../components/index/RegisterSection.tsx";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {GrowthPotentialSlider} from "../components/index/GrowthPotentialSlider.tsx";
import {WhyToInvestInCryptocurrencies} from "../components/index/WhyToInvestInCryptocurrencies.tsx";
import {Link} from "react-router-dom";
import {routes} from "../utils/constants";

export const Index: FC = () => {
    const {user} = useUserContext();

    return (
        <>
            <SliderPage />
            <SloganSection />
            <GrowthPotentialSlider />
            <WhyToInvestInCryptocurrencies />
            <InvestWithUs />
            {!user ? <RegisterSection /> : ""}
            {/*<GreedFearStrategies />*/}
            {/*<IndexPersonalStrategy />*/}
            {/*<GuidedInvestControl />*/}
            {/*<IndexInvestorGuide />*/}
            {/*<WhyToInvestInCryptocurrencies />*/}
            {/*<BitcoinProfitCalculator />*/}
        </>
    );
};
