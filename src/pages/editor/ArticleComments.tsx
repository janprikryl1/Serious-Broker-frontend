import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getArticleComments} from "../../api/commentsService.ts";
import {CommentType} from "../../utils/types/CommentType.ts";
import {toCzechDateFormat} from "../../utils/constants/functions.ts";
import {Button} from "../../components/Button.tsx";

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
        <div className="padding-bottom">
            <div className="service-details__wrapper">
                <div className="service-details__item">
                    <div className="service-details__item-inner">
                        <div
                            className="service-details__content"
                            data-aos="fade-up"
                            data-aos-duration="900"
                        >
                            <h1 className="admin-section-title">{t("Comments")}</h1>
                            {comments !== undefined && comments.length > 0 ? comments.map((comment) => (
                                <div key={comment.id} className="mb-5">
                                    <p>{comment.user} (<span>{toCzechDateFormat(comment.created)}</span>)</p>
                                    <div className="comment__body-inner">
                                        <p className="mb-0">{comment.text}</p>
                                    </div>
                                </div>
                            )) : <p>{t("No comments yet")}</p>}
                            <Button onClick={goBack}>{t("Back")}</Button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}