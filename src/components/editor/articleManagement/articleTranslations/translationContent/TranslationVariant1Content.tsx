import {FC} from "react";
import {TranslateTextField} from "./translateContentComponents/TranslateTextField.tsx";
import {TranslateTaskColumn} from "./translateContentComponents/TranslateTaskColumn.tsx";
import {TranslateImageColumn} from "./translateContentComponents/TranslateImageColumn.tsx";
import {TranslateAnimateColumn} from "./translateContentComponents/TranslateAnimateColumn.tsx";
import {TranslateAddTaskButton} from "./translateContentComponents/TranslateAddTaskButton.tsx";
import {TranslateContentNavigation} from "./translateContentComponents/TranslateContentNavigation.tsx";
import {ListFilesModal} from "../../newArticle/newArticlePages/NewArticleContent/imageUpload/ListFilesModal.tsx";
import {useHandleSetPathOfImage} from "../../../../../utils/hooks/useHandleSetPathOfImage.ts";

export const TranslationVariant1Content:FC = () => {
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
                <TranslateTaskColumn />
                <TranslateImageColumn currentContent={currentContent} setCurrentContent={setCurrrentContent} setCurrentTask={setCurrentTask} openFileModal={openFileModal} />
                <TranslateAnimateColumn />
            </div>
            <TranslateAddTaskButton />
            <TranslateContentNavigation />
        </>
    );
}