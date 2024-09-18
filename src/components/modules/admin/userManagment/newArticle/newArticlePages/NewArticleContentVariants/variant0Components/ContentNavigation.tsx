import { FC } from "react";
import { useArticleCreate } from "../../../../../../../../utils/providers/ArticleCreateProvider";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

export const ContentNavigation: FC = () => {
    const { t } = useTranslation();
    const { content, setContent, currentContent, setCurrentContent } = useArticleCreate();

    const handleIncreaseCategory = () => {
        if (currentContent === content.length - 1) {
            const newCategory = {
                id: content.length,
                title: "",
                tasks: [
                    {
                        id: 0,
                        task: "",
                        image: "",
                        animateTo: { x: 0, y: 0 },
                    },
                ],
            };
            setContent((prevState) => [...prevState, newCategory]);
        }
        setCurrentContent(currentContent + 1);
    };

    const handleDecreaseCategory = () => {
        if (currentContent > 0) {
            setCurrentContent(currentContent - 1);
        }
    };

    const handleDeleteCategory = () => {
        setContent((prevState) => prevState.filter((_, i) => i !== currentContent));

        // Move to the previous category if not on the first one
        if (currentContent > 0) {
            setCurrentContent(currentContent - 1);
        }
        
    };

    return (
        <>
            <Button
                variant="danger"
                onClick={handleDecreaseCategory}
                disabled={currentContent === 0}
            >
                {t("Previous")}
            </Button>{` ${currentContent + 1}/${content.length} `}
            <Button
                variant="primary"
                onClick={handleIncreaseCategory}
                disabled={currentContent === content.length - 1 && content.length === 0}
            >
                {t("Next")}
            </Button>{" "}
            {content.length > 1 &&<Button variant="warning" onClick={handleDeleteCategory} disabled={content.length <= 1}>
                {t("Delete")}
            </Button>}
        </>
    );
};
