import {Dispatch, FC, SetStateAction} from "react";
import {Button} from "react-bootstrap";
import {FaCheckCircle} from "react-icons/fa";
import {ContentType} from "../../../../utils/types/article/ContentType.ts";

type Props = {
    task: number;
    category: number;
    content: ContentType[];
    setTask: Dispatch<SetStateAction<number>>;
};

export const ArticleTaskTextColumn:FC<Props> = ({task, category, content, setTask}) => {
    const handleTaskDone = () => {
        if (task + 1 < content[category].tasks.length) {
            setTask(task + 1);
        }
    };
    
    return (
        <div className="col-sm-8">
            {content[category].tasks.map((taskData, index) => (
                <p key={index} style={{color: index <= task ? "default" : "gray"}}>
                    {taskData.task}
                </p>
            ))}

            <Button
                onClick={handleTaskDone}
                variant="success"
                disabled={task === content[category].tasks.length - 1}
            >
                <FaCheckCircle/>
            </Button>
        </div>
    );
}