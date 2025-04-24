import {ChangeEvent, FC} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useArticleCreate} from "../../../../../../utils/providers/ArticleCreateProvider.tsx";

export const TaskColumn:FC = () => {
    const { t } = useTranslation();
    const { content, currentContent, setContent } = useArticleCreate();

    const handleSetContentTask = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, contentIndex: number, taskIndex: number) => {
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === contentIndex) {
                    return {
                        ...category,
                        tasks: category.tasks.map((task, j) => {
                            if (j === taskIndex) {
                                return { ...task, task: e.target.value };
                            }
                            return task;
                        }),
                    };
                }
                return category;
            })
        );
    };
    
    return (
        <div className="col-sm">
            <h4>{t("Task")}</h4>
            {content[currentContent].tasks.map((task, taskIndex) => (
                <div key={task.id}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>{t("Text")}</InputGroup.Text>
                        <Form.Control
                            placeholder="..."
                            value={task.task}
                            onChange={(e) => handleSetContentTask(e, currentContent, taskIndex)}
                        />
                    </InputGroup>
                </div>
            ))}
        </div>
    );
}