import {FC, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {TranslationsOverview} from "../../utils/types/article/TranslationsOverview.ts";
import {useTranslation} from "react-i18next";
import {getTranslations} from "../../api/translationsService.ts";
import {Button} from "react-bootstrap";
import {ArticlesSkeleton} from "../../components/modules/articles/ArticlesSkeleton.tsx";
import {TranslationCard} from "../../components/modules/admin/translations/TranslationCard.tsx";
import {ArticleDetailProps} from "../../utils/types/article/ArticleDetailProps.ts";
import {adminURLS} from "../../utils/constants";

export const ArticleTranslate:FC = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    const [article, setArticle] = useState<ArticleDetailProps>();
    const [translations, setTranslations] = useState<TranslationsOverview[]>();

    useEffect(() => {
        if (!id) return;
        const getAllTranslations = async () => {
            try {
                const response = await getTranslations(id);
                if (!response) return;
                setArticle(response.data.article);
                setTranslations(response.data.translations);
            } catch (e) {
                console.error(e);
            }
        };
        getAllTranslations();
    }, []);
    
    return (
            <div className="padding-bottom admin-container mt-5">
                    <div className="service-details__wrapper">
                        <div className="service-details__item">
                            <div
                                className="service-details__content"
                                data-aos="fade-up"
                                data-aos-duration="900"
                            >
                                <h3>{t("Translations for article ")}{article?.title}</h3>
                                <Link to={`${adminURLS.translations}${id}`}><Button
                                    variant="outline-warning">{t("New translation")}</Button></Link>
                                <div className="padding-bottom mt-3">
                                    <div className="blog__wrapper">
                                        <div className="row g-4">
                                            {translations === undefined ? (
                                                    <ArticlesSkeleton />
                                            ) : translations.length === 0 ? (
                                                <p>{t("No translations")}</p>
                                            ) : (
                                                translations.map((item) => (
                                                    <div key={item.id} className="col-sm-6 col-lg-4">
                                                        {id && <TranslationCard translation={item} articleId={id} setTranslation={setTranslations} />}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
};