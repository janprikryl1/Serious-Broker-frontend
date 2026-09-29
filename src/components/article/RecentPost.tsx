import {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {RecentArticleProps} from "../../utils/types/article/RecentArticleProps.ts";
import {getRecentArticles} from "../../utils/api/articleService.ts";
import {routes} from "../../utils/constants";
import { GlassCard } from "../reusable/GlassCard.tsx";

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
        <GlassCard bgColor="var(--secondary-color)" opacity={0.1}>
            <h6>{t("Recent Posts")}</h6>
            <div className="tw-text-base">
                <ul>
                    {recentPost && recentPost.map((data) => (
                        <li key={data.id}>
                            <p><Link to={`${routes.articleURL}${data.id}`} className="link-underline-none">{data.title}</Link></p>
                        </li>
                    ))}
                </ul>
            </div>
        </GlassCard>
    );
};