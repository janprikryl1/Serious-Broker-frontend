import {FC} from "react";
import {Newsletter} from "../components/modules/index/Newsletter.tsx";
import {Pricing} from "../components/modules/index/Pricing.tsx";
import {Services} from "../components/modules/index/Services.tsx";
import {ComingSoon} from "../components/modules/index/ComingSoon.tsx";
import {Hero} from "../components/modules/index/Hero.tsx";


export const Index:FC = () => {
    return (
        <>
            <Hero />
            <ComingSoon />
            <Services />
            <Pricing />
            <Newsletter />
        </>
    );
}
