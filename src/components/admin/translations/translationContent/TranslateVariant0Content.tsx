import {FC, useState} from "react";
import {ListFilesModal} from "../../articleManagement/newArticle/newArticlePages/NewArticleContent/imageUpload/ListFilesModal.tsx";
import {TranslateTextField} from "./translateContentComponents/TranslateTextField.tsx";
import {TranslateImageColumn} from "./translateContentComponents/TranslateImageColumn.tsx";
import {TranslateTaskColumn} from "./translateContentComponents/TranslateTaskColumn.tsx";
import {TranslateAnimateColumn} from "./translateContentComponents/TranslateAnimateColumn.tsx";
import {TranslateAddTaskButton} from "./translateContentComponents/TranslateAddTaskButton.tsx";
import {TranslateContentNavigation} from "./translateContentComponents/TranslateContentNavigation.tsx";
import {useArticleTranslate} from "../../../../utils/providers/ArticleTranslateProvider.tsx";
import {useModal} from "../../../../utils/hooks/useModal.tsx";

export const TranslateVariant0Content: FC = () => {
    const { setContent, currentContent } = useArticleTranslate();
    const { isOpen: isFileModalOpen, openModal: openFileModal, closeModal: closeFileModal } = useModal();
    const [currentTask, setCurrentTask] = useState<number>();
    const [currrentContent, setCurrrentContent] = useState<number>();


    const handleSetPathOfImage = (path: string) => {
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === currrentContent) {
                    return {
                        ...category,
                        tasks: category.tasks.map((task, j) => {
                            if (j === currentTask) {
                                return { ...task, image: path };
                            }
                            return task;
                        }),
                    };
                }
                return category;
            })
        );
        closeFileModal();
    };

    return (
        <>
            <ListFilesModal
                isOpen={isFileModalOpen}
                handleSetPath={(path: string) => handleSetPathOfImage(path)}
                handleModalClose={closeFileModal}
            />
            <TranslateTextField />
            <div className="row">
                <TranslateImageColumn currentContent={currentContent} setCurrentContent={setCurrrentContent} setCurrentTask={setCurrentTask} openFileModal={openFileModal} />
                <TranslateTaskColumn />
                <TranslateAnimateColumn />
            </div>
            <TranslateAddTaskButton />
            <TranslateContentNavigation />
        </>
    );
};
