import {FC, useEffect, useState} from "react";
import {TitleHeader} from "../components/modules/about/TitleHeader.tsx";
import {ArticlePagiation} from "../components/modules/articles/ArticlePagiation.tsx";
import {ArticleCard} from "../components/modules/articles/ArticleCard.tsx";
import {getAllArticles} from "../api/articleService.ts";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import {ArticleProps} from "../utils/types/article/ArticleProps.ts";
import {ArticlesSkeleton} from "../components/modules/articles/ArticlesSkeleton.tsx";
import {CryptoCurrenciesLinkCard} from "../components/modules/articles/CryptoCurrenciesList/CryptoCurrenciesLinkCard.tsx";
import {DictionaryLinkCard} from "../components/modules/articles/dictionary/DictionaryLinkCard.tsx";

export const Articles:FC = () => {
    const {t} = useTranslation();
    const [articles, setArticles] = useState<ArticleProps[]>();

    useEffect(()=>{
        const fetchArticles = async () => {
            try{
                const response = await getAllArticles();
                setArticles(response.data);
            } catch(error){
                Swal.fire({
                    icon: "error",
                    title: t("Loading failed"),
                    text: t("Please try again later"),
                });
                console.error("Error fetching user details:", error);
            }
        };
        fetchArticles();
    },[])
    
    return (
        <>
            <TitleHeader title="Articles"/>
            <div className="blog padding-top padding-bottom section-bg-color">
                <div className="container">
                    <div className="blog__wrapper">
                        <div className="row g-4">
                            <DictionaryLinkCard />
                            <CryptoCurrenciesLinkCard />
                            {articles ? (
                                articles.map((item) => (
                                    <div key={item.id} className="col-sm-6 col-lg-4">
                                        <ArticleCard data={item}/>
                                </div>
                            ))
                            ) : (
                                <ArticlesSkeleton/>
                            )}
                        </div>
                    <ArticlePagiation/>
                    </div>
                </div>
            </div>
        </>
    )
}