import {FC, useEffect} from 'react'
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {AboutUs} from "../components/about/AboutUs.tsx";
import {ContactUs} from "../components/about/ContactUs.tsx";
import {WarningOfRisks} from "../components/navbar/WarningOfRisks.tsx";

export const About:FC = () => {
    return (
        <>
            <TitleHeader title="About us"/>
            <div className="container">
                <AboutUs />
            </div>
            <ContactUs />
            <WarningOfRisks />
        </>
    )
}