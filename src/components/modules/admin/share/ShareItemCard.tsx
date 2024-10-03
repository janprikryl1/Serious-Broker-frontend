import {FC} from "react";
import {Link} from "react-router-dom";
import {adminURLS} from "../../../../utils/constants";
import {ArticlePostListResponseResponse} from "../../../../utils/types/ArticlePostListResponse.ts";

type Props = {
    articlePost: ArticlePostListResponseResponse;
}

export const ShareItemCard:FC<Props> = ({articlePost}) => {
    return (
        <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
            <div className="blog__item-inner blog__item-inner--style2">
                <div className="blog__content">
                    <h5 className="10 style2">
                        <Link to={`${adminURLS.postEdit}${articlePost.article_id}/${articlePost.id}`}
                              className="link-underline-none">{articlePost.type} ({articlePost.title})</Link>
                    </h5>
                </div>
            </div>
        </div>
    );
};