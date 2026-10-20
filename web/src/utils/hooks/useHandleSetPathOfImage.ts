import {useArticleTranslate} from "../providers/ArticleTranslateProvider.tsx";
import {useModal} from "./useModal.tsx";
import {useState} from "react";

export const useHandleSetPathOfImage = () => {
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
    
    return {
        isFileModalOpen,
        handleSetPathOfImage,
        closeFileModal,
        currentContent,
        setCurrrentContent,
        setCurrentTask,
        openFileModal
    }
}