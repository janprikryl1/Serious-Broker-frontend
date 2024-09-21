import {Link} from "react-router-dom";
import {FC} from "react";
import {TranslationsOverview} from "../../../../utils/types/article/TranslationsOverview.ts";
import {Button} from "react-bootstrap";
import {FaRegTrashAlt} from "react-icons/fa";

type Props = {
    articleId: string;
    translation: TranslationsOverview;
};

export const TranslationCard:FC<Props> = ({articleId, translation}) => {
    const handleDelete = async (id: number) => {
        console.log(id);
    }
    
    if (translation) {
        return (
            <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
                <div className="blog__item-inner blog__item-inner--style2">
                    <div className="blog__content">
                        <h5 className="10 style2">
                            <Link to={`/admin/translations/${articleId}/${translation.id}`}
                                  className="none">{translation.language}</Link>
                        </h5>

                        {translation.id !== null && (
                            <div className="blog__writer">
                                <div className="blog__writer-designation d-flex align-items-center">
                                    <Button
                                        variant="danger"
                                        className="ms-2 p-1"
                                        onClick={() => translation.id !== null && handleDelete(translation.id)}
                                    >
                                        <FaRegTrashAlt/>
                                    </Button>
                                </div>
                            </div>
                            )}
                    </div>
                </div>
            </div>
        );
    }
};