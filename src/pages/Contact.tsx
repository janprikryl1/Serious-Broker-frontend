import {FC} from "react";
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {ContactCard} from "../components/contact/ContactCard.tsx";

export const Contact:FC = () => {
  return (
    <>
      <TitleHeader title="Contact"/>
      <ContactCard />
    </>
  );
};