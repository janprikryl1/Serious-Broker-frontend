import {FC} from "react";
import Button from "react-bootstrap/Button";
import {useArticleCreate} from "../../../../../../../utils/providers/ArticleCreateProvider.tsx";

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
            <div className="col-sm-16" style={{textAlign: "center"}}>
                <Button variant="warning" onClick={handleAddTask}>
                    +
                </Button>
            </div>
        </div>
    );
}