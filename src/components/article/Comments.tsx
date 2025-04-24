import {Dispatch, FC, SetStateAction, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {getArticleComments} from "../../utils/api/commentsService.ts";
import {CommentType} from "../../utils/types/article/CommentType.ts";
import {CommentComponent} from "./CommentComponent.tsx";

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
                                <CommentComponent key={comment.id} comment={comment} />
                            )) : <p>{t("No comments yet")}</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};