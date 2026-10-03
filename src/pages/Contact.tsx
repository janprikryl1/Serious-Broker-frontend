import {FC} from "react";
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {ContactCard} from "../components/contact/ContactCard.tsx";
import {WarningOfRisks} from "../components/navbar/WarningOfRisks.tsx";
import {SEO} from "../components/reusable/SEO.tsx";
import {getContactPageSchema, getBreadcrumbSchema} from "../utils/functions/seoSchemas.ts";
import {routes} from "../utils/constants";
import {useTranslation} from "react-i18next";

export const Contact:FC = () => {
  const {t} = useTranslation();

  const schemas = [
    getContactPageSchema(),
    getBreadcrumbSchema([
      { name: "Domů", url: routes.home },
      { name: t("Contact") || "Kontakt", url: routes.contact },
    ]),
  ];

  return (
    <>
      <SEO
        title={t("Contact") || "Kontakt"}
        description="Kontaktujte tým projektu Serious Broker. Dotazy, podpora a spolupráce."
        canonicalPath={routes.contact}
        schema={schemas}
      />
      <TitleHeader title="Contact"/>
      <ContactCard />
      <WarningOfRisks />
    </>
  );
};