import {useArticleCreate} from "../../providers/ArticleCreateProvider.tsx";

export const useArticleHandleCategory = () => {
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
                        animateTo: {
                            from: { x: 0, y: 0 },
                            to: { x: 0, y: 0 }
                        },
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
        if (currentContent > 0) {
            setCurrentContent(currentContent - 1);
        }
    };
    
    return {
        handleIncreaseCategory,
        handleDecreaseCategory,
        handleDeleteCategory
    }
}