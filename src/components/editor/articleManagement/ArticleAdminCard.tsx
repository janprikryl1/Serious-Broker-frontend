import {Dispatch, FC, SetStateAction} from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FaComment, FaRegTrashAlt, FaShareAlt} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import {MdOutlineTranslate} from "react-icons/md";
import {ArticleProps} from "../../../utils/types/article/ArticleProps.ts";
import {deleteArticle} from "../../../utils/api/articleService.ts";
import {editorURLS} from "../../../utils/constants";
import {toCzechDateFormat} from "../../../utils/functions/dateFunctions.ts";
import {CustomSwal} from "../../../utils/functions/customSwal.ts";

type Props = {
    data: ArticleProps;
    link?: string;
    setArticles: Dispatch<SetStateAction<ArticleProps[]>>;
};

export const ArticleAdminCard: FC<Props> = ({data, link = "article", setArticles}) => {
    const {t} = useTranslation();
    
    const handleDelete = async (id: number) => {
        try {
            const response = await deleteArticle(id);
            if (response !== undefined && response.data.message === "Article marked as deleted successfully") {
                CustomSwal.fire({
                    icon: "success",
                    title: t("Article deleted"),
                    text: t("Article deleted successfully"),
                });
                setArticles((articles) => articles.filter(item => item.id !== id));
            }
        } catch (error) {
            CustomSwal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Error while deleting article"),
            });
            console.error("Error deleting article:", error);
        }
    }

    return (
        <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
            <div className="blog__item-inner blog__item-inner--style2">
                <div className="blog__content">
                    <h5 className="style2">
                        <Link to={`${link}${data.id}`} className="link-underline-none">{data.title}</Link>
                    </h5>
                    <p className="mb-15" style={{height: 100}}>{data.description}</p>
                    <div className="blog__writer">
                        <div className="blog__writer-designation d-flex align-items-center">
                            <p className="mb-0">{data.user_firstname} {data.user_surname} <span>{toCzechDateFormat(data.changed)}</span></p>
                            <Button
                                variant="danger"
                                className="ms-2 p-1"
                                onClick={() => handleDelete(data.id)}
                            >
                                <FaRegTrashAlt />
                            </Button>
                            {data.allowComments && (
                                <Link to={`${editorURLS.articleComments}${data.id}`} className="link-underline-none">
                                    <Button
                                        variant="warning"
                                        className="ms-2 p-1"
                                    >
                                        <FaComment />
                                    </Button>
                                </Link>
                            )}
                            <Link to={`${editorURLS.articleShare}${data.id}`}>
                                <Button
                                    variant="success"
                                    className="ms-2 p-1"
                                >
                                    <FaShareAlt />
                                </Button>
                            </Link>
                            <Link to={`${editorURLS.articleTranslate}${data.id}`}>
                                <Button
                                    variant="secondary"
                                    className="ms-2 p-1"
                                >
                                    <MdOutlineTranslate />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};