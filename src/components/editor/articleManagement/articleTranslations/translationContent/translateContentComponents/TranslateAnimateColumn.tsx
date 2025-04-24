import {FC} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {FaTrash} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import {useArticleTranslate} from "../../../../../../utils/providers/ArticleTranslateProvider.tsx";
import {Button, ButtonColor} from "../../../../../reusable/Button.tsx";
import {useTranslateAnimate} from "../../../../../../utils/hooks/useTranslateAnimate.ts";

export const TranslateAnimateColumn:FC = () => {
    const { t } = useTranslation();
    const { content, currentContent } = useArticleTranslate();
    const {
        handleRemoveTask,
        handleSetContentAnimateToX,
        handleSetContentAnimateToY,
        handleSetContentAnimateFromX,
        handleSetContentAnimateFromY
    } = useTranslateAnimate();

    return (
        <div className="col-sm">
            <h4>{t("Animation")}</h4>
            {content[currentContent].tasks.map((task, taskIndex) => (
                <div key={task.id}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>{t("From")}</InputGroup.Text>
                        <Form.Control
                            placeholder="0"
                            value={task.animateTo.from.x}
                            onChange={(e) => handleSetContentAnimateFromX(e, currentContent, taskIndex)}
                        />
                        <Form.Control
                            placeholder="0"
                            value={task.animateTo.from.y}
                            onChange={(e) => handleSetContentAnimateFromY(e, currentContent, taskIndex)}
                        />
                        <InputGroup.Text>{t("To")}</InputGroup.Text>
                        <Form.Control
                            placeholder="0"
                            value={task.animateTo.to.x}
                            onChange={(e) => handleSetContentAnimateToX(e, currentContent, taskIndex)}
                        />
                        <Form.Control
                            placeholder="0"
                            value={task.animateTo.to.y}
                            onChange={(e) => handleSetContentAnimateToY(e, currentContent, taskIndex)}
                        />
                        <Button color={ButtonColor.red} onClick={() => handleRemoveTask(currentContent, taskIndex)}>
                            <FaTrash/>
                        </Button>
                    </InputGroup>
                </div>
            ))}
        </div>
    );
}