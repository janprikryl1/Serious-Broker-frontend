import {useState} from "react";
import {useArticleCreate} from "../../providers/ArticleCreateProvider.tsx";
import {useModal} from "../useModal.tsx";

export const useArticleContentImage = () => {
    const { setContent } = useArticleCreate();
    const { isOpen: isFileModalOpen, openModal: openFileModal, closeModal: closeFileModal } = useModal();
    const [currentTask, setCurrentTask] = useState<number>();
    const [currentContent, setCurrentContent] = useState<number>();

    const handleSetPathOfImage = (path: string) => {
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === currentContent) {
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
        openFileModal,
        closeFileModal,
        setCurrentTask,
        setCurrentContent,
        handleSetPathOfImage
    }
}