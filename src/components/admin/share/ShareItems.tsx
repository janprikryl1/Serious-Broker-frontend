import {FC} from "react";
import {ShareItemCard} from "./ShareItemCard.tsx";
import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {ArticlePostListResponseResponse} from "../../../utils/types/ArticlePostListResponse.ts";
import {editorURLS} from "../../../utils/constants";
import {Button} from "../../reusable/Button.tsx";

type Props = {
    articlePosts: ArticlePostListResponseResponse[];
}

export const ShareItems:FC<Props> = ({articlePosts}) => {
    const {id} = useParams();
    const {t} = useTranslation();
    
    return (
        <div className="row mt-5">
            {articlePosts.length > 0 ? articlePosts.map((articlePost) => (
                <div key={articlePost.id} className="col-sm-6 col-lg-4">
                    <ShareItemCard articlePost={articlePost}/>
                </div>
            )) : <p>{t("No posts yet")}</p>}
            <Link to={`${editorURLS.postEdit}${id}`}>
                <Button>{t("New post")}</Button>
            </Link>
        </div>
    );
};