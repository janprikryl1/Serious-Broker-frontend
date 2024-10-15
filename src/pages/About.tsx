import {FC} from 'react'
import {TitleHeader} from "../components/modules/about/TitleHeader.tsx";
import {AboutUs} from "../components/modules/about/AboutUs.tsx";
import {Newsletter} from "../components/modules/index/Newsletter.tsx";
import {HelpSection} from "../components/modules/about/HelpSection.tsx";

export const About:FC = () => {
    return (
        <>
            <TitleHeader title="About us"/>
            <AboutUs />
            <HelpSection />
            <Newsletter/>
        </>
    )
}