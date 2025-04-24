import {FC} from "react";
import {useArticleCreate} from "../../../../../../utils/providers/ArticleCreateProvider.tsx";
import {Button} from "../../../../../reusable/Button.tsx";
import {defaultTask} from "../../../../../../utils/constants/defaultContent.ts";

export const AddTaskButton:FC = () => {
    const { setContent, currentContent } = useArticleCreate();
    
    const handleAddTask = () => {
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === currentContent) {
                    return {
                        ...category,
                        tasks: [...category.tasks, {...defaultTask, id: category.tasks.length}]
                    };
                }
                return category;
            })
        );
    };
    
    return (
        <div className="row">
            <div className="col-sm-16 text-center text-bold">
                <Button style={{fontSize:15}} onClick={handleAddTask}>
                    +
                </Button>
            </div>
        </div>
    );
}