import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useArticleCreate} from "../../../../../utils/providers/ArticleCreateProvider.tsx";
import {Button} from "../../../../reusable/Button.tsx";

export const NewArticleUploadButton:FC = () => {
    const {uploadArticle, saved} = useArticleCreate();
    const {t} = useTranslation();

    return (
        <Button onClick={uploadArticle} disabled={saved}>{t("Save")}</Button>
    );
};
