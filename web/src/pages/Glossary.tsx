import {FC, useEffect, useState} from "react";
import glossaryOfTermsImage from "../utils/icons/glossaryOfTerms/glossary_of_terms.webp";
import {useTranslation} from "react-i18next";
import {getGlossary} from "../utils/api/glossaryService.ts";
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {GlossaryItem} from "../components/articles/dictionary/GlossaryItem.tsx";
import {GlossaryType} from "../utils/types/article/GlossaryType.ts";
import {Link} from "react-router-dom";
import {routes} from "../utils/constants";
import {IoIosArrowBack} from "react-icons/io";
import {SEO} from "../components/reusable/SEO.tsx";
import {getGlossaryFAQSchema, getBreadcrumbSchema} from "../utils/functions/seoSchemas.ts";

export const Glossary: FC = () => {
  const {t, i18n} = useTranslation();
  const [glossaries, setGlossaries] = useState<GlossaryType[]>([]);

  useEffect(() => {
    const loadGlossary = async () => {
      try {
        const res = await getGlossary();
        setGlossaries(res.data);
        navigateToGlossary();
      } catch (error) {
        console.error(error);
      }
    };
    loadGlossary();
  }, []);

  const navigateToGlossary = () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        const yOffset = -(window.innerHeight * 0.4);
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }
  }

  const glossarySchemas = [
    getGlossaryFAQSchema(glossaries, i18n.language),
    getBreadcrumbSchema([
      { name: "Domů", url: routes.home },
      { name: t("Glossary of terms") || "Slovník pojmů", url: routes.dictionary },
    ]),
  ];

  return (
    <>
      <SEO
        title={t("Glossary of terms") || "Slovník pojmů"}
        description="Kompletní slovník kryptoměnových a investičních pojmů – Bitcoin, blockchain, DCA, halving a další termíny přehledně vysvětlené."
        canonicalPath={routes.dictionary}
        schema={glossaries.length > 0 ? glossarySchemas : undefined}
      />
      <div className="container tw-pt-8">
        <Link to={routes.articles} className="tw-inline-block">
          <div className="tw-flex tw-items-center tw-text-gray-2 hover:tw-underline">
            <IoIosArrowBack/>
            {t("Back to articles")}
          </div>
        </Link>
      </div>
      <TitleHeader title="Glossary of terms"/>
      <div className="container">
        <div className=" mb-40" data-aos="fade-up" data-aos-duration="800"
        >
        </div>
        <div data-aos="fade-up" data-aos-duration="900">
          {glossaries.map((glossary) => (
            <GlossaryItem glossary={glossary} key={glossary.id}/>
          ))}
        </div>
        {/*<Faq/>*/}
      </div>
    </>
  );
};
