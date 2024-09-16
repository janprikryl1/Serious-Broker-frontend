import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ArticleProps} from "../utils/types/article/ArticleProps.ts";
import {ArticleCard} from "../components/modules/articles/ArticleCard.tsx";
import {ArticlesSkeleton} from "../components/modules/articles/ArticlesSkeleton.tsx";
import {getSearchArticles} from "../api/articleService.ts";
import {TitleHeader} from "../components/modules/about/TitleHeader.tsx";
import {SidebarSearch} from "../components/modules/article/SidebarSearch.tsx";
import {RecentPost} from "../components/modules/article/RecentPost.tsx";
import {useTranslation} from "react-i18next";

export const SearchArticles:FC = () => {
    const {text} = useParams();
    const { t } = useTranslation();
    const [articleResults, setArticleResults] = useState<ArticleProps[]>();
    
    useEffect(()=>{
        if (!text) return;
        const fetchArticles = async () => {
            try{
                const response = await getSearchArticles(text);
                setArticleResults(response.data);
            } catch(error){
                console.error("Error fetching user details:", error);
            }
        };
        fetchArticles();
    }, [text]);
    
    return (
        <>
            <TitleHeader title={t("Results for: ") + (text ?? "")} />
            <div className="blog-details padding-top padding-bottom section-bg-color">
                <div className="container">
                    <div className="blog-details__wrapper">
                        <div className="row g-5">
                            <div className="col-lg-8">
                                <div className="row">
                                    {articleResults === undefined ? (
                                        <ArticlesSkeleton/>
                                    ) : articleResults.length > 0 ? (
                                        articleResults.map((item) => (
                                            <div key={item.id} className="col-sm-6 col-lg-4">
                                                <ArticleCard data={item}/>
                                            </div>
                                        ))
                                    ) :(
                                        <h3>{t("No results found")}</h3>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-8  col-12">
                                <div className="sidebar">
                                    <div className="row g-4">
                                        <div className="col-12">
                                            <SidebarSearch param={text} />
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