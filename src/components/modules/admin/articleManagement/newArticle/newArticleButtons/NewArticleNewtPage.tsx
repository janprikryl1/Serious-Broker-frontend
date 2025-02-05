import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useArticleCreate} from "../../../../../../utils/providers/ArticleCreateProvider.tsx";
import {Button, ButtonColor} from "../../../../../Button.tsx";

export const NewPage:FC = () => {
    const {page, nextPage} = useArticleCreate();
    const {t} = useTranslation();

    return (
        <Button color={ButtonColor.gray} onClick={nextPage} style={{marginRight: 10}}>{page === 0 ? t("Continue") : t("Back")}</Button>
    )
}
