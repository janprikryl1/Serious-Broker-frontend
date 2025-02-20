import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ArticlePostListResponseResponse} from "../../utils/types/ArticlePostListResponse.ts";
import {getArticlePosts} from "../../utils/api/articlePostService.ts";
import {ShareLink} from "../../components/admin/share/ShareLink.tsx";
import {ShareItems} from "../../components/admin/share/ShareItems.tsx";
import {ShareSkeleton} from "../../components/admin/share/ShareSkeleton.tsx";

export const ArticleShare:FC = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    const [articleName, setArticleName] = useState("");
    const [articlePosts, setArticlePosts] = useState<ArticlePostListResponseResponse[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);
    
    useEffect(() => {
        if (!id) return;
        const getArticle = async () => {
            const response = await getArticlePosts(id);
            if (response !== undefined) {
                setArticleName(response.data.article_name);
                setArticlePosts(response.data.data);
                setLanguages(response.data.languages);
            }
        }
        getArticle();
    }, [id]);
    
    return (
        <div className="padding-bottom">
            <div className="service-details__wrapper">
                <div className="service-details__item">
                    <div className="service-details__item-inner">
                        <div
                            className="service-details__content"
                            data-aos="fade-up"
                            data-aos-duration="900"
                        >
                        <h3 className="admin-section-title">{t("Share article ")}{articleName}</h3>
                        {id && articlePosts ? (
                            <div className="mt-3 mb-2">
                                <div className="blog__wrapper">
                                    <ShareLink id={id} languages={languages}/>
                                    <ShareItems articlePosts={articlePosts}/>
                                </div>
                            </div>
                        ) : (
                            <ShareSkeleton />
                        )}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}