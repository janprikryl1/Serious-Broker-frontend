import {FC} from "react";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import {useArticleTranslate} from "../../../../utils/providers/ArticleTranslateProvider.tsx";

export const TranslateUpdateButton:FC = () => {
    const {uploadTranslate, saved} = useArticleTranslate();
    const {t} = useTranslation();

    return (
        <Button variant="success" onClick={uploadTranslate} disabled={saved}>{t("Save")}</Button>
    );
};
