import {FC} from "react";
import {ShareItemCard} from "./ShareItemCard.tsx";
import {ArticlePostListResponseResponse} from "../../../../utils/types/ArticlePostListResponse.ts";
import {useTranslation} from "react-i18next";

type Props = {
    articlePosts: ArticlePostListResponseResponse[];
}

export const ShareItems:FC<Props> = ({articlePosts}) => {
    const {t} = useTranslation();
    
    return (
        <div className="row g-4 mt-5">
            {articlePosts.length > 0 ? articlePosts.map((articlePost) => (
                <div key={articlePost.id} className="col-sm-6 col-lg-4">
                    <ShareItemCard articlePost={articlePost}/>
                </div>
            )) : <p>{t("No posts yet")}</p>}
        </div>
    );
};