import {FC} from "react";
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {useTranslation} from "react-i18next";

export const GdprInfo:FC = () => {
    const {t} = useTranslation();
    
    return (
        <>
            <TitleHeader title="GDPR"/>
            <div className="container cta-dark">
                <h1>{t("Information about GDPR")}</h1>
                <p>{t("Based on the EU Regulation 2016/679 (hereinafter referred to as GDPR), we inform you that we process your personal data in connection with marketing activities and the sale of our goods.")}</p>
                <p>{t("This includes contact information about customers and individuals with whom we communicate in various ways - by email, printed correspondence, telephone and in person.")}</p>
                <p>{t("This is data that we need for marketing purposes, to ensure the preparation and execution of contracts or orders and subsequent invoicing, including the resolution of complaints. We also work with contact information of persons we need in a legitimate interest for the organisation of deliveries.")}</p>
                <p>{t("Invoicing data must be kept on record for 10 years due to a legal obligation under the VAT Act.")}</p>
                <p>{t("We also use the contact data for the purpose of sending e-mail offers, invitations, printed and other promotional materials due to legitimate interest in accordance with the law. The option to refuse this is included in each message. You have the right to extract, correct, delete, restrict processing, object, withdraw consent and lodge a complaint.")}</p>
                <p>{t("The data controller is Serious Investment s.r.o. with registered office at Stanislavského 355, 72100 Ostrava - Svinov")}</p>
                <p>{t("Contact person responsible for data protection: Marie Fasugová (Mobile: 603 242 708) fasugova@serious-investment.cz")}</p>
                <p>{t("You can unsubscribe from email offers at the bottom of the email.")}</p>
            </div>
        </>
    )
}