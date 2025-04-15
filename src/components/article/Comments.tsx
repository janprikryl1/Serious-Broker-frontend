import {Dispatch, FC, SetStateAction, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {getArticleComments} from "../../utils/api/commentsService.ts";
import {toCzechDateFormat} from "../../utils/functions/dateFunctions.ts";
import {CommentType} from "../../utils/types/article/CommentType.ts";

type Props = {
    articleId: number;
    comments?: CommentType[];
    setComments: Dispatch<SetStateAction<CommentType[] | undefined>>;
}

export const Comments:FC<Props> = ({articleId, comments, setComments}) => {
    const { t } = useTranslation();

    useEffect(() => {
        const getComments = async () => {
            try {
                const result = await getArticleComments(articleId);
                setComments(result.data);
            } catch (error) {
                console.error(error);
            }
        }
        getComments();
    }, [articleId]);
    
    return (
        <div className="blog-details__comment" data-aos="fade-up" data-aos-duration="1000">
            <div className="sidebar">
                <div className="sidebar__comment">
                    <div className="sidebar__head">
                        <h3>{t("Comments")}</h3>
                    </div>
                    <div className="sidebar__comment-body">
                        <ul>
                            {comments !== undefined && comments.length > 0 ? comments.map((comment) => (
                                <li className="sidebar__comment-item" key={comment.id}>
                                    <div className="comment">
                                        <div className="comment__inner">
                                            <div className="comment__head">
                                                <div className="comment__author">
                                                    <div className="comment__author-info">
                                                        <h6 className="mb-0">
                                                            {comment.user} <span>{toCzechDateFormat(comment.created)}</span></h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="comment__body">
                                                <div className="comment__body-inner">
                                                    <p className="mb-0">{comment.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )) : <p>{t("No comments yet")}</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};