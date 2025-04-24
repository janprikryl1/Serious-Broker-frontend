import {FC} from "react";
import {useArticleTranslate} from "../../../../../../utils/providers/ArticleTranslateProvider.tsx";
import {Button} from "../../../../../reusable/Button.tsx";
import {defaultTask} from "../../../../../../utils/constants/defaultContent.ts";

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
                            {...defaultTask, id: category.tasks.length}
                        ],
                    };
                }
                return category;
            })
        );
    };

    return (
        <div className="row">
            <div className="col-sm-16 text-center">
                <Button onClick={handleAddTask}>
                    +
                </Button>
            </div>
        </div>
    );
}