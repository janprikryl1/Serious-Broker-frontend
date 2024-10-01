import {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getRecentArticles} from "../../../api/articleService.ts";
import {RecentArticleProps} from "../../../utils/types/article/RecentArticleProps.ts";
import {routes} from "../../../utils/constants";

export const RecentPost:FC = () => {
    const {t} = useTranslation();
    const [recentPost, setRecentPost] = useState<RecentArticleProps[]>();

    useEffect(() => {
        const fetchRecentPost = async () => {
            try {
                const response = await getRecentArticles();
                const arrayData = response.data;
                setRecentPost(arrayData);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchRecentPost();
    }, []);
    
    return (
        <div className="sidebar__recentpost">
            <div className="sidebar__head">
                <h6>{t("Recent Post")}</h6>
            </div>
            <div className="sidebar__recentpost-body">
                <ul>
                    {recentPost && recentPost.map((data) => (
                    <li key={data.id}>
                        <div className="sidebar__recentpost-item">
                            <div className="sidebar__recentpost-inner">
                                <div className="sidebar__recentpost-content">
                                    <p><Link to={`${routes.articleURL}${data.id}`} className="link-underline-none">{data.title}</Link></p>
                                </div>
                            </div>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};