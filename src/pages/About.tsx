import {FC} from 'react'
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {AboutUs} from "../components/about/AboutUs.tsx";
import {HelpSection} from "../components/about/HelpSection.tsx";
import {Newsletter} from "../components/index/Newsletter.tsx";

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