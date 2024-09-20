import {FC, useState} from "react";
import {useArticleCreate} from "../../../../../../../../utils/providers/ArticleCreateProvider.tsx";
import {useModal} from "../../../../../../../../utils/hooks/useModal.tsx";
import {ListFilesModal} from "../imageUpload/ListFilesModal.tsx";
import {TitleField} from "../TitleField.tsx";
import {ImageColumn} from "../ImageColumn.tsx";
import {TaskColumn} from "../TaskColumn.tsx";
import {AnimateColumn} from "../AnimateColumn.tsx";
import {AddTaskButton} from "../AddTaskButton.tsx";
import {ContentNavigation} from "../variant0Components/ContentNavigation.tsx";

export const Variant1Content:FC = () => {
    const { setContent, currentContent } = useArticleCreate();
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
            <TitleField />
            <div className="row">
                <TaskColumn />
                <ImageColumn currentContent={currentContent} setCurrentContent={setCurrrentContent} setCurrentTask={setCurrentTask} openFileModal={openFileModal} />
                <AnimateColumn />
            </div>
            <AddTaskButton />
            <ContentNavigation />
        </>
    );
}