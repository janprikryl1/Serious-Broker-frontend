import {ChangeEvent, FC} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useArticleTranslate} from "../../../../../../utils/providers/ArticleTranslateProvider.tsx";
import {translate} from "../../../../../../utils/api/translateService.ts";
import {Button} from "../../../../../reusable/Button.tsx";

export const TranslateTaskColumn:FC = () => {
    const { t } = useTranslation();
    const { content, currentContent, setContent, language } = useArticleTranslate();

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
    
    const handleTranslateCurrentContentTask = async (taskIndex: number) => {
        const currentContentTask = content[currentContent].tasks[taskIndex].task;
        const response = await translate(currentContentTask, language);
        if (!response) return;
        const translatedText = response.data.translated_text;
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === currentContent) {
                    return {
                        ...category,
                        tasks: category.tasks.map((task, j) => {
                            if (j === taskIndex) {
                                return { ...task, task: translatedText };
                            }
                            return task;
                        }),
                    };
                }
                return category;
            })
        );
    }

    return (
        <div className="col-sm">
            <h4>{t("Task")}</h4>
            {content[currentContent].tasks.map((task, taskIndex) => (
                <div key={task.id}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>{t("Text")}</InputGroup.Text>
                        <Form.Control
                            placeholder={t("Enter task text...")}
                            value={task.task}
                            onChange={(e) => handleSetContentTask(e, currentContent, taskIndex)}
                        />
                        <Button onClick={() => handleTranslateCurrentContentTask(taskIndex)}>{t("Translate")}</Button>
                    </InputGroup>
                </div>
            ))}
        </div>
    );
}