import {FC} from "react";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import {useArticleCreate} from "../../../../../../utils/providers/ArticleCreateProvider.tsx";

export const NewArticleUploadButton:FC = () => {
    const {uploadArticle, saved} = useArticleCreate();
    const {t} = useTranslation();

    return (
        <Button variant="success" onClick={uploadArticle} disabled={saved}>{t("Save")}</Button>
    );
};
