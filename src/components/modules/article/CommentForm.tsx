import {Dispatch, FC, SetStateAction, useState} from "react";
import {useTranslation} from "react-i18next";
import {addArticleComment} from "../../../api/commentsService.ts";
import {CommentType} from "../../../utils/types/CommentType.ts";
import {useUserContext} from "../../../utils/providers/providerUser.tsx";

type Props = {
    articleId: number;
    setComments: Dispatch<SetStateAction<CommentType[] | undefined>>;
}

export const CommentForm: FC<Props> = ({articleId, setComments}) => {
    const { t } = useTranslation();
    const [message, setMessage] = useState<string>("");
    const {user} = useUserContext();

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const result = await addArticleComment(articleId, message);
            if (!result) return;
            if (result.data.status === "success") {
                const newComment: CommentType = {text: message, created: (new Date()).toString(), articleId: articleId, user: `${user?.firstname} ${user?.surname}`, id: 0};
                setComments((prevState) => [...prevState ?? [], newComment]);
                setMessage("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="blog-details__commentform"
            data-aos="fade-up"
            data-aos-duration="1000"
        >
            <div className="sidebar">
                <div className="sidebar__commentform" id="post">
                    <div className="sidebar__head">
                        <h3>{t("Leave a comment")}</h3>
                    </div>
                    <div className="sidebar__commentform-body pt-25">
                        <form action="/">
                            <div className="row g-4">
                                <div className="col-md-12">
                                    <div>
                                        <label htmlFor="textarea" className="form-label">
                                            {t("Message")}
                                        </label>
                                        <textarea
                                            cols={30}
                                            rows={5}
                                            className="form-control"
                                            id="textarea"
                                            placeholder={t("Enter Your Message")}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="trk-btn trk-btn--border trk-btn--primary mt-4"
                                onClick={handleClick}
                            >
                                {t("Send")}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
