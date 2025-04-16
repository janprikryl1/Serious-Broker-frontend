import {FC} from "react";
import {useArticleCreate} from "../../../../../../utils/providers/ArticleCreateProvider.tsx";
import {Button} from "../../../../../reusable/Button.tsx";

export const AddTaskButton:FC = () => {
    const { setContent, currentContent } = useArticleCreate();
    
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
            <div className="col-sm-16 text-center text-bold">
                <Button style={{fontSize:15}} onClick={handleAddTask}>
                    +
                </Button>
            </div>
        </div>
    );
}