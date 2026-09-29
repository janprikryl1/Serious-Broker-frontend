import {FC} from "react";
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {ContactCard} from "../components/contact/ContactCard.tsx";
import {WarningOfRisks} from "../components/navbar/WarningOfRisks.tsx";
import {ContactUs} from "../components/about/ContactUs.tsx";

export const Contact:FC = () => {
  return (
    <>
      <TitleHeader title="Contact"/>
      <ContactCard />
      <WarningOfRisks />
    </>
  );
};