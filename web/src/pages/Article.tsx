import {FC, useEffect, useState} from "react";
import {ArticleDetailProps} from "../utils/types/article/ArticleDetailProps.ts";
import {useParams, useNavigate, useLocation, Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {routes} from "../utils/constants";
import {getArticleDetails} from "../utils/api/articleService.ts";
import {getTranslatedArticle} from "../utils/api/translateService.ts";
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {ArticleDetails} from "../components/article/ArticleDetails.tsx";
import {ArticleSkeleton} from "../components/article/ArticleSkeleton.tsx";
import {SidebarSearch} from "../components/article/SidebarSearch.tsx";
import {RecentPost} from "../components/article/RecentPost.tsx";
import {Highlight} from "../components/editor/highlights/Highlight.tsx";
import {CustomSwal} from "../utils/functions/customSwal.ts";
import {TranslationsOverview} from "../utils/types/article/translate/TranslationsOverview.ts";
import {IoIosArrowBack} from "react-icons/io";
import {SEO} from "../components/reusable/SEO.tsx";
import {getArticleSchema, getBreadcrumbSchema} from "../utils/functions/seoSchemas.ts";
import {domain, imageURL} from "../utils/constants";

export const Article: FC = () => {
  const {id, language} = useParams();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleDetailProps>();
  const [translations, setTranslations] = useState<TranslationsOverview[]>([]);
  const [selectedLanguage, setLanguage] = useState<string>(language ?? "cs");
  const [initialLoad, setInitialLoad] = useState(true);
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const fetchArticle = async () => {
    try {
      const response = await getArticleDetails(id!);
      const articleLanguage = response.data.article.language;
      setTranslations([{id: null, language: articleLanguage}, ...response.data.translations]);
      if (selectedLanguage === articleLanguage) {
        setLanguage(articleLanguage);
        setArticle(response.data.article);
      }
      setInitialLoad(false);
    } catch (error: any) {
      if (error.response.status === 403) {
        navigate(routes.home);
      }
      CustomSwal.fire({
        icon: "error",
        title: t("Loading failed"),
        text: t("Please try again later"),
      });
      console.error("Error fetching article details:", error);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (!id || !selectedLanguage || initialLoad) return;
    const isOriginalLanguage = translations.length > 0 && selectedLanguage === translations[0].language;
    if (isOriginalLanguage) {
      navigate(`${routes.articleURL}${id}`, {replace: true});
      fetchArticle();
      return;
    }

    const loadTranslation = async () => {
      try {
        const response = await getTranslatedArticle(id, selectedLanguage);
        if (!response) return;
        setArticle(response.data);
        navigate(`${routes.articleURL}${id}/${selectedLanguage}`, {replace: true});
      } catch (error) {
        CustomSwal.fire({
          icon: "error",
          title: t("Loading failed"),
          text: t("Please try again later"),
        });
        console.error("Error fetching translation:", error);
      }
    };
    loadTranslation();
  }, [id, selectedLanguage, initialLoad]);

  const currentUrl = `${domain}${routes.articleURL}${id}${selectedLanguage && selectedLanguage !== "cs" ? `/${selectedLanguage}` : ""}`;
  const articleImageUrl = article?.titleImage
    ? (article.titleImage.startsWith("http") ? article.titleImage : `${imageURL}${article.titleImage}`)
    : (article?.banner ? (article.banner.startsWith("http") ? article.banner : `${imageURL}${article.banner}`) : `${domain}/SB-badge.ico`);
  const authorName = article ? [article.user_firstname, article.user_surname].filter(Boolean).join(" ") : undefined;

  const articleSchemas = article ? [
    getArticleSchema(article, currentUrl),
    getBreadcrumbSchema([
      { name: "Domů", url: routes.home },
      { name: "Články", url: routes.articles },
      { name: article.title, url: currentUrl },
    ]),
  ] : undefined;

  return (
    <>
      {article && (
        <SEO
          title={article.title}
          description={article.description || article.title}
          canonicalPath={`${routes.articleURL}${id}`}
          ogImage={articleImageUrl}
          ogType="article"
          author={authorName}
          publishedTime={article.created}
          modifiedTime={article.changed || article.created}
          schema={articleSchemas}
        />
      )}
      <div className="container tw-pt-8">
        <Link to={routes.articles} className="tw-inline-block">
          <div className="tw-flex tw-items-center tw-text-gray-2 hover:tw-underline">
            <IoIosArrowBack />
            {t("Back to articles")}
          </div>
        </Link>
      </div>
      <div className="mt-4 padding-bottom">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              {article ? (
                <ArticleDetails
                  article={article}
                  translations={translations}
                  setLanguage={setLanguage}
                  language={selectedLanguage}
                />
              ) : <ArticleSkeleton/>}
            </div>
            <div className="col-lg-4 col-md-8 col-12">
              <div className="sidebar">
                <div className="row g-4">
                  <div className="col-12">
                    <SidebarSearch/>
                  </div>
                  <div className="col-12">
                    <RecentPost/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
