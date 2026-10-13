import {Link} from "react-router-dom";
import {Dispatch, FC, SetStateAction} from "react";
import {Button} from "react-bootstrap";
import {FaRegTrashAlt} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import {deleteTranslation} from "../../../../utils/api/translateService.ts";
import {editorURLS} from "../../../../utils/constants";
import {CustomSwal} from "../../../../utils/functions/customSwal.ts";
import {TranslationsOverview} from "../../../../utils/types/article/translate/TranslationsOverview.ts";

type Props = {
    articleId: string;
    translation: TranslationsOverview;
    setTranslation: Dispatch<SetStateAction<TranslationsOverview[] | undefined>>;
};

export const TranslationCard:FC<Props> = ({articleId, translation, setTranslation}) => {
    const {t} = useTranslation();
    const handleDelete = async (id: number) => {
        const response = await deleteTranslation(id);
        if (response !== undefined && response.data.message === 'Translate deleted successfully') {
            CustomSwal.fire({
                icon: "success",
                title: t("Translation deleted"),
                text: t("Translation deleted"),
            });
            setTranslation(translations => translations?.filter(item => item.id !== id));
        }
    }
    
    if (translation) {
        return (
            <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
                <div className="blog__item-inner blog__item-inner--style2">
                    <div className="blog__content">
                        <h5 className="10 style2">
                            <Link to={`${editorURLS.translationsEdit}${articleId}/${translation.id}`}
                                  className="link-underline-none">{t(translation.language)}</Link>
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