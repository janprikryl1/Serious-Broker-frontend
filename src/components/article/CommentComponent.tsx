import {FC} from "react";
import {toCzechDateFormat} from "../../utils/functions/dateFunctions.ts";
import {CommentType} from "../../utils/types/article/CommentType.ts";

type Props = {
    comment: CommentType;
}

export const CommentComponent:FC<Props> = ({comment}) => {
    return (
        <li className="sidebar__comment-item">
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
    )
}