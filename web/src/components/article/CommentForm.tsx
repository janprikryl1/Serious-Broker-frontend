import {Dispatch, FC, SetStateAction, useState} from "react";
import {useTranslation} from "react-i18next";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {addArticleComment} from "../../utils/api/commentsService.ts";
import {useAchievementsContext} from "../../utils/providers/AchievementsProvider.tsx";
import {routes} from "../../utils/constants";
import {CommentType} from "../../utils/types/article/CommentType.ts";
import {GlassCard} from "../reusable/GlassCard.tsx";
import {Button} from "../reusable/Button.tsx";

type Props = {
    articleId: number;
    setComments: Dispatch<SetStateAction<CommentType[] | undefined>>;
}

export const CommentForm: FC<Props> = ({articleId, setComments}) => {
    const { t } = useTranslation();
    const [message, setMessage] = useState<string>("");
    const {user} = useUserContext();
    const {setAchievements} = useAchievementsContext();

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const result = await addArticleComment(articleId, message);
            if (!result) return;
            if (result.data.status === "success") {
                const newComment: CommentType = {text: message, created: (new Date()).toString(), articleId: articleId, user: `${user?.firstname} ${user?.surname}`, id: 0};
                setComments((prevState) => [...prevState ?? [], newComment]);
                setMessage("");
                if (result.data.achievement) {
                    setAchievements((prevState) => [...prevState ?? [], result.data.achievement]);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <GlassCard  data-aos="fade-up" data-aos-duration="1000" className="tw-mt-10" bgColor="var(--secondary-color)" opacity={0.1}>
            <div className="">
                    <h5 className="tw-pb-">{t("Leave a comment")}</h5>

                <form action={routes.home} className="pt-25">
                    <div className="row g-4 tw-mb-4">
                        <div className="col-md-12">
                            <div>
                                <textarea
                                    cols={30}
                                    rows={5}
                                    className="form-control"
                                    id="textarea"
                                    placeholder={t("Enter Your Message")}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                    {/*<button
                        type="submit"
                        className="trk-btn trk-btn--border trk-btn--primary mt-4"
                        onClick={handleClick}
                    >
                        {t("Send")}
                    </button>*/}
                    <Button onClick={handleClick}>
                        {t("Send")}
                    </Button>
                </form>
            </div>
        </GlassCard>
    );
};
