import {FC} from "react";
import {ContactCard} from "../components/modules/contact/ContactCard.tsx";
import {TitleHeader} from "../components/modules/about/TitleHeader.tsx";

export const Contact:FC = () => {
  return (
    <>
      <TitleHeader title="About Us"/>
      <ContactCard />
    </>
  );
};