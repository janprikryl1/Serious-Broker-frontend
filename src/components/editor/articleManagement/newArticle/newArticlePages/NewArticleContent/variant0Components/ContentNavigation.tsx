import { FC } from "react";
import { useTranslation } from "react-i18next";
import {Button, ButtonColor} from "../../../../../../reusable/Button.tsx";
import {useArticleCreate} from "../../../../../../../utils/providers/ArticleCreateProvider.tsx";
import {useArticleHandleCategory} from "../../../../../../../utils/hooks/edit/useArticleHandleCategory.ts";

export const ContentNavigation: FC = () => {
    const { t } = useTranslation();
    const { content, currentContent } = useArticleCreate();
    const {handleIncreaseCategory, handleDecreaseCategory, handleDeleteCategory} = useArticleHandleCategory();

    return (
        <>
            <Button
                color={ButtonColor.red}
                onClick={handleDecreaseCategory}
                disabled={currentContent === 0}
            >
                {t("Previous")}
            </Button>{` ${currentContent + 1}/${content.length} `}
            <Button
                color={ButtonColor.gold}
                onClick={handleIncreaseCategory}
                disabled={currentContent === content.length - 1 && content.length === 0}
            >
                {t("Next")}
            </Button>{" "}
            {content.length > 1 &&<Button color={ButtonColor.red} onClick={handleDeleteCategory} disabled={content.length <= 1}>
                {t("Delete")}
            </Button>}
        </>
    );
};
