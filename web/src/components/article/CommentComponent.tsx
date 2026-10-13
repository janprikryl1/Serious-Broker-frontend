import {FC} from "react";
import {toCzechDateFormat} from "../../utils/functions/dateFunctions.ts";
import {CommentType} from "../../utils/types/article/CommentType.ts";

type Props = {
    comment: CommentType;
}

export const CommentComponent:FC<Props> = ({comment}) => {
    return (
        <li>
            <div className="tw-mb-0 tw-text-white tw-flex tw-justify-between">
                <span className="tw-font-bold">{comment.user}</span>
                <span className="tw-italic tw-text-stone-300 tw-text-sm">{toCzechDateFormat(comment.created)}</span>
            </div>
            <p className="tw-pl-8">{comment.text}</p>
        </li>
    )
}