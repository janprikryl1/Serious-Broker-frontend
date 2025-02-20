import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useArticleTranslate} from "../../../utils/providers/ArticleTranslateProvider.tsx";
import {Button, ButtonColor} from "../../reusable/Button.tsx";

export const TranslateUpdateButton:FC = () => {
    const {uploadTranslate, saved} = useArticleTranslate();
    const {t} = useTranslation();

    return (
        <Button color={ButtonColor.green} className="mb-3" onClick={uploadTranslate} disabled={saved}>{t("Save")}</Button>
    );
};
