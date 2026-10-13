import {FC} from "react";
import {TranslateTextField} from "./translateContentComponents/TranslateTextField.tsx";
import {TranslateImageColumn} from "./translateContentComponents/TranslateImageColumn.tsx";
import {TranslateTaskColumn} from "./translateContentComponents/TranslateTaskColumn.tsx";
import {TranslateAnimateColumn} from "./translateContentComponents/TranslateAnimateColumn.tsx";
import {TranslateAddTaskButton} from "./translateContentComponents/TranslateAddTaskButton.tsx";
import {TranslateContentNavigation} from "./translateContentComponents/TranslateContentNavigation.tsx";
import {ListFilesModal} from "../../newArticle/newArticlePages/NewArticleContent/imageUpload/ListFilesModal.tsx";
import {useHandleSetPathOfImage} from "../../../../../utils/hooks/useHandleSetPathOfImage.ts";

export const TranslateVariant0Content: FC = () => {
    const {
        isFileModalOpen,
        handleSetPathOfImage,
        closeFileModal,
        currentContent,
        setCurrrentContent,
        setCurrentTask,
        openFileModal
    } = useHandleSetPathOfImage();

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
