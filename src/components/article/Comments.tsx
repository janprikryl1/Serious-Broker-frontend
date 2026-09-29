import {Dispatch, FC, SetStateAction, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {getArticleComments} from "../../utils/api/commentsService.ts";
import {CommentType} from "../../utils/types/article/CommentType.ts";
import {CommentComponent} from "./CommentComponent.tsx";
import {GlassCard} from "../reusable/GlassCard.tsx";

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
        <GlassCard data-aos="fade-up" data-aos-duration="1000" bgColor="var(--secondary-color)" opacity={0.1}>
            <h5 className="tw-pb-0">{t("Comments")}</h5>
            <hr className="tw-border-gray-1" />
            <ul>
                {comments !== undefined && comments.length > 0 ? comments.map((comment) => (
                  <>
                    <CommentComponent key={comment.id} comment={comment} />
                    <hr className="tw-border-gray-1" />
                  </>
                )) : <p className="tw-text-base tw-text-gray-2">{t("No comments yet")}</p>}
            </ul>
        </GlassCard>
    );
};