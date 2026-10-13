import {FC} from "react";
import { ContentNavigation } from "./ContentNavigation";
import {ListFilesModal} from "../imageUpload/ListFilesModal.tsx";
import {TitleField} from "../TitleField.tsx";
import {ImageColumn} from "../ImageColumn.tsx";
import {TaskColumn} from "../TaskColumn.tsx";
import {AddTaskButton} from "../AddTaskButton.tsx";
import {AnimateColumn} from "../AnimateColumn.tsx";
import {useArticleCreate} from "../../../../../../../utils/providers/ArticleCreateProvider.tsx";
import {useArticleContentImage} from "../../../../../../../utils/hooks/edit/useArticleContentImage.ts";

export const Variant0Content: FC = () => {
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
                <ImageColumn currentContent={currentContent} setCurrentContent={setCurrentContent} setCurrentTask={setCurrentTask} openFileModal={openFileModal} />
                <TaskColumn />
                <AnimateColumn />
            </div>
            <AddTaskButton />
            <ContentNavigation />
        </>
    );
};
