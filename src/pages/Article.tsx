import {FC, useEffect, useState} from "react";
import {TitleHeader} from "../components/modules/about/TitleHeader.tsx";
import {ArticleDetails} from "../components/modules/article/ArticleDetails.tsx";
import {SidebarSearch} from "../components/modules/article/SidebarSearch.tsx";
import {RecentPost} from "../components/modules/article/RecentPost.tsx";
import {getArticleDetails} from "../api/articleService.ts";
import Swal from "sweetalert2";
import {ArticleDetailProps} from "../utils/types/article/ArticleDetailProps.ts";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const Article:FC = () => {
    const {id} = useParams();
    const {t} = useTranslation();

    const [article, setArticle] = useState<ArticleDetailProps>();
   

    useEffect(() => {
        if (!id) return;
        const fetchArticle = async () => {
            try {
                const response = await getArticleDetails(id);
                setArticle(response.data);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: t("Loading failed"),
                    text: t("Please try again later"),
                });
                console.error("Error fetching user details:", error);
            }
        };
        fetchArticle();
    }, [id]);
    
    return (
        <>
            <TitleHeader title={article?.title ?? "Article"} />
            <div className="blog-details padding-top padding-bottom section-bg-color">
                <div className="container">
                    <div className="blog-details__wrapper">
                        <div className="row g-5">
                            <div className="col-lg-8">
                                {article && <ArticleDetails article={article} /> }
                            </div>
                            <div className="col-lg-4 col-md-8  col-12">
                                <div className="sidebar">
                                    <div className="row g-4">
                                        <div className="col-12">
                                            <SidebarSearch />
                                        </div>
                                        <div className="col-12">
                                            <RecentPost />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}