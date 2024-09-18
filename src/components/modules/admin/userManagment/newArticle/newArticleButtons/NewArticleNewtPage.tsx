import {FC} from "react";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import {useArticleCreate} from "../../../../../../utils/providers/ArticleCreateProvider.tsx";

export const NewPage:FC = () => {
    const {page, nextPage} = useArticleCreate();
    const {t} = useTranslation();

    return (
        <Button variant="primary" onClick={nextPage} style={{marginRight: 10}}>{page === 0 ? t("Continue") : t("Back")}</Button>
    )
}
