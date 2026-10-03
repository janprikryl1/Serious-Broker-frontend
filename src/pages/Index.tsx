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

import {SEO} from "../components/reusable/SEO.tsx";
import {getWebsiteSchema} from "../utils/functions/seoSchemas.ts";

export const Index: FC = () => {
    const {user} = useUserContext();

    return (
        <>
            <SEO
                title="Serious Broker - Chytré investice do kryptoměn"
                description="Serious Broker – webová platforma pro analýzu a asistenci při investování do kryptoměn, semafory trhu, investiční plány a vzdělávací články."
                canonicalPath="/"
                schema={getWebsiteSchema()}
            />
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
