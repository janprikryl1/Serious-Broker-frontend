import {FC} from "react";
import {Newsletter} from "../components/modules/index/Newsletter.tsx";
import {Blog} from "../components/modules/index/Blogs.tsx";
import {Pricing} from "../components/modules/index/Pricing.tsx";
import {Services} from "../components/modules/index/Services.tsx";
import {Partner} from "../components/modules/index/Partner.tsx";
import {Hero} from "../components/modules/index/Hero.tsx";


export const Home:FC = () => {
    return (
        <>
            <Hero />
            <Partner />
            <Services />
            <Pricing />
            <Blog />
            <Newsletter />
        </>
    );
}
