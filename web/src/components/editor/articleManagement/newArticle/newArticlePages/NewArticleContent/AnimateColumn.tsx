import {FC} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {FaTrash} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import {useArticleCreate} from "../../../../../../utils/providers/ArticleCreateProvider.tsx";
import {Button, ButtonColor} from "../../../../../reusable/Button.tsx";
import {useArticleAnimate} from "../../../../../../utils/hooks/edit/useArticleAnimate.ts";
import {VscSettings} from "react-icons/vsc";
import {ControlImageModal} from "./ControlImageModal.tsx";

export const AnimateColumn:FC = () => {
    const { t } = useTranslation();
    const { content, currentContent } = useArticleCreate();
    const {
        handleRemoveTask,
        handleSetContentAnimateToX,
        handleSetContentAnimateToY,
        handleSetContentAnimateFromX,
        handleSetContentAnimateFromY,

        handleOpenAdjustCoordinatesModal,
        controlImage,
        isControlImageModalOpen,
        closeModal
    } = useArticleAnimate();
    
    return (
        <div className="col-sm">
            <h4>{t("Animation")}</h4>
            {content[currentContent].tasks.map((task, taskIndex) => (
                <div key={task.id}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>{t("From")}</InputGroup.Text>
                        <Button onClick={() => handleOpenAdjustCoordinatesModal(currentContent, taskIndex)}><VscSettings /></Button>
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
            <ControlImageModal controlImage={controlImage} isControlImageModalOpen={isControlImageModalOpen} closeModal={closeModal} />
        </div>
    );
}