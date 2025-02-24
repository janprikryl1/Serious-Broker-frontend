import {FC} from "react";
import {useArticleTranslate} from "../../../../../../utils/providers/ArticleTranslateProvider.tsx";
import {Button} from "../../../../../reusable/Button.tsx";

export const TranslateAddTaskButton:FC = () => {
    const { setContent, currentContent } = useArticleTranslate();

    const handleAddTask = () => {
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === currentContent) {
                    return {
                        ...category,
                        tasks: [
                            ...category.tasks,
                            {
                                id: category.tasks.length,
                                task: "",
                                image: "",
                                animateTo: {
                                    from: { x: 0, y: 0 },
                                    to: { x: 0, y: 0 }
                                },
                            },
                        ],
                    };
                }
                return category;
            })
        );
    };

    return (
        <div className="row">
            <div className="col-sm-16" style={{textAlign: "center"}}>
                <Button onClick={handleAddTask}>
                    +
                </Button>
            </div>
        </div>
    );
}