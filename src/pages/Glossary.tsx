import { FC, useEffect, useState } from "react";
import { TitleHeader } from "../components/modules/about/TitleHeader.tsx";
import glossaryOfTermsImage from "../utils/icons/glossaryOfTerms/glossary_of_terms.webp";
import { Faq } from "../components/modules/articles/dictionary/Faq.tsx";
import { useTranslation } from "react-i18next";
import { GlossaryItem } from "../components/modules/articles/dictionary/GlossaryItem.tsx";
import { GlossaryType } from "../utils/types/GlossaryType.ts";
import { getGlossary } from "../api/glossaryService.ts";

export const Glossary: FC = () => {
    const { t } = useTranslation();
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
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    }

    return (
        <>
            <TitleHeader title="Glossary of terms" />
            <div className="container padding-bottom">
                    <div className="service-details__item">
                        <div className="service-details__item-inner">
                            <div
                                className="service-details__thumb mb-40"
                                data-aos="fade-up"
                                data-aos-duration="800"
                            >
                                <div className="service-details__thumb-inner">
                                    <img src={glossaryOfTermsImage} alt="service-icon" />
                                </div>
                            </div>
                            <div
                                className="service-details__content"
                                data-aos="fade-up"
                                data-aos-duration="900"
                            >
                                <h3 className="mb-15">
                                    {t("About Crypto")}
                                </h3>
                                <p className="mb-0">{t("We are here to help you learn about cryptocurrencies and how they work. Whether you're a beginner or an experienced trader, we've got you covered. Our articles cover a wide range of topics, from the basics of cryptocurrencies to more advanced topics.")}</p>
                                {glossaries.map((glossary) => (
                                    <GlossaryItem glossary={glossary} key={glossary.id} />
                                ))}
                            </div>
                            <Faq />
                        </div>
                    </div>
            </div>
        </>
    );
};
