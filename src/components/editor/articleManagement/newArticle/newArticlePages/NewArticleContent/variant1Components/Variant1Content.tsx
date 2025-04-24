import {FC} from "react";
import {ListFilesModal} from "../imageUpload/ListFilesModal.tsx";
import {TitleField} from "../TitleField.tsx";
import {ImageColumn} from "../ImageColumn.tsx";
import {TaskColumn} from "../TaskColumn.tsx";
import {AnimateColumn} from "../AnimateColumn.tsx";
import {AddTaskButton} from "../AddTaskButton.tsx";
import {ContentNavigation} from "../variant0Components/ContentNavigation.tsx";
import {useArticleCreate} from "../../../../../../../utils/providers/ArticleCreateProvider.tsx";
import {useArticleContentImage} from "../../../../../../../utils/hooks/edit/useArticleContentImage.ts";

export const Variant1Content:FC = () => {
    const { currentContent } = useArticleCreate();
    const {
        isFileModalOpen,
        openFileModal,
        closeFileModal,
        setCurrentTask,
        setCurrentContent,
        handleSetPathOfImage
    } = useArticleContentImage();

    return (
        <>
            <ListFilesModal
                isOpen={isFileModalOpen}
                handleSetPath={(path: string) => handleSetPathOfImage(path)}
                handleModalClose={closeFileModal}
            />
            <TitleField />
            <div className="row">
                <TaskColumn />
                <ImageColumn currentContent={currentContent} setCurrentContent={setCurrentContent} setCurrentTask={setCurrentTask} openFileModal={openFileModal} />
                <AnimateColumn />
            </div>
            <AddTaskButton />
            <ContentNavigation />
        </>
    );
}