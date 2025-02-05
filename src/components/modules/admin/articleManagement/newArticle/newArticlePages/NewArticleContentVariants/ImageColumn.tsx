import {Dispatch, FC, SetStateAction} from "react";
import {InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useArticleCreate} from "../../../../../../../utils/providers/ArticleCreateProvider.tsx";
import {Button} from "../../../../../../Button.tsx";

type Props = {
    currentContent: number;
    setCurrentContent: Dispatch<SetStateAction<number | undefined>>;
    setCurrentTask: Dispatch<SetStateAction<number | undefined>>;
    openFileModal: () => void;
};

export const ImageColumn:FC<Props> = ({currentContent, setCurrentContent, setCurrentTask, openFileModal}) => {
    const { t } = useTranslation();
    const { content } = useArticleCreate();
    return (
        <div className="col-sm-4">
            <h4>{t("Image")}</h4>
            {content[currentContent].tasks.map((task, taskIndex) => (
                <div key={task.id}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>{t("Image")}</InputGroup.Text>
                        <Button
                            onClick={() => {
                                setCurrentContent(currentContent);
                                setCurrentTask(taskIndex);
                                openFileModal();
                            }}
                        >
                            {task.image || t("Choose image")}
                        </Button>
                    </InputGroup>
                </div>
            ))}
        </div>
    );
}