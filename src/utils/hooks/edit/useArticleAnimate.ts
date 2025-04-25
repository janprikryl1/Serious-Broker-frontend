import {ChangeEvent, useState} from "react";
import {useArticleCreate} from "../../providers/ArticleCreateProvider.tsx";
import {useModal} from "../useModal.tsx";
import {ContentSection} from "../../types/article/ContentType.ts";

export const useArticleAnimate = () => {
    const { setContent, content } = useArticleCreate();
    const [controlImage, setControlImage] = useState<ContentSection>();
    const {isOpen:isControlImageModalOpen, openModal, closeModal} = useModal();

    const handleSetContentAnimateToX = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, contentIndex: number, taskIndex: number) => {
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === contentIndex) {
                    return {
                        ...category,
                        tasks: category.tasks.map((task, j) => {
                            if (j === taskIndex) {
                                return {
                                    ...task,
                                    animateTo: {
                                        ...task.animateTo,
                                        to: {
                                            ...task.animateTo.to,
                                            x: parseInt(e.target.value),
                                        },
                                    },
                                };
                            }
                            return task;
                        }),
                    };
                }
                return category;
            })
        );
    };

    const handleSetContentAnimateToY = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, contentIndex: number, taskIndex: number) => {
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === contentIndex) {
                    return {
                        ...category,
                        tasks: category.tasks.map((task, j) => {
                            if (j === taskIndex) {
                                return {
                                    ...task,
                                    animateTo: {
                                        ...task.animateTo,
                                        to: {
                                            ...task.animateTo.to,
                                            y: parseInt(e.target.value),
                                        },
                                    },
                                };
                            }
                            return task;
                        }),
                    };
                }
                return category;
            })
        );
    };

    const handleSetContentAnimateFromX = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, contentIndex: number, taskIndex: number) => {
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === contentIndex) {
                    return {
                        ...category,
                        tasks: category.tasks.map((task, j) => {
                            if (j === taskIndex) {
                                return {
                                    ...task,
                                    animateTo: {
                                        ...task.animateTo,
                                        from: {
                                            ...task.animateTo.from,
                                            x: parseInt(e.target.value),
                                        },
                                    },
                                };
                            }
                            return task;
                        }),
                    };
                }
                return category;
            })
        );
    };

    const handleSetContentAnimateFromY = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, contentIndex: number, taskIndex: number) => {
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === contentIndex) {
                    return {
                        ...category,
                        tasks: category.tasks.map((task, j) => {
                            if (j === taskIndex) {
                                return {
                                    ...task,
                                    animateTo: {
                                        ...task.animateTo,
                                        from: {
                                            ...task.animateTo.from,
                                            y: parseInt(e.target.value),
                                        },
                                    },
                                };
                            }
                            return task;
                        }),
                    };
                }
                return category;
            })
        );
    };

    const handleRemoveTask = (contentIndex: number, taskIndex: number) => {
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === contentIndex) {
                    return {
                        ...category,
                        tasks: category.tasks.filter((_, j) => j !== taskIndex),
                    };
                }
                return category;
            })
        );
    };
    
    const handleOpenAdjustCoordinatesModal = (contentIndex: number, taskIndex: number) => {
        setControlImage(content[contentIndex].tasks.find((_, index) => index === taskIndex));
        openModal();
    }
    
    return {
     handleRemoveTask,
     handleSetContentAnimateToX,
     handleSetContentAnimateToY,
     handleSetContentAnimateFromX,
     handleSetContentAnimateFromY,
        
        handleOpenAdjustCoordinatesModal,
        controlImage,
        isControlImageModalOpen,
        closeModal
    }
}