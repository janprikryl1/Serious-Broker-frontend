import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getArticleComments} from "../../api/commentsService.ts";
import {CommentType} from "../../utils/types/CommentType.ts";
import {Button} from "react-bootstrap";
import {toCzechDateFormat} from "../../utils/constants/functions.ts";

export const ArticleComments:FC = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    const [comments, setComments] = useState<CommentType[]>();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!id) return;
        const getComments = async () => {
            try {
                const result = await getArticleComments(parseInt(id));
                setComments(result.data);
            } catch (error) {
                console.error(error);
            }
        }
        getComments();
    }, [id]);
    
    const goBack = () => {
        navigate(-1);
    }
    
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
                                                            {comment.user}
                                                            <span>{toCzechDateFormat(comment.created)}</span></h6>
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
                            <Button variant="outline-warning" className="p-2" onClick={goBack}>{t("Back")}</Button>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}