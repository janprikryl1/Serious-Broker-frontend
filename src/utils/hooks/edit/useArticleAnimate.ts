import {ChangeEvent} from "react";
import {useArticleCreate} from "../../providers/ArticleCreateProvider.tsx";

export const useArticleAnimate = () => {
    const { setContent } = useArticleCreate();

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

    const handleSetContentAnimateToY = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        contentIndex: number,
        taskIndex: number
    ) => {
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

    const handleSetContentAnimateFromX = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        contentIndex: number,
        taskIndex: number
    ) => {
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

    const handleSetContentAnimateFromY = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        contentIndex: number,
        taskIndex: number
    ) => {
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
    
    return {
     handleRemoveTask,
     handleSetContentAnimateToX,
     handleSetContentAnimateToY,
     handleSetContentAnimateFromX,
     handleSetContentAnimateFromY
    }
}