import {FC} from "react";
import {Form, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FaTrash} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import {useArticleCreate} from "../../../../../../../utils/providers/ArticleCreateProvider.tsx";

export const AnimateColumn:FC = () => {
    const { t } = useTranslation();
    const { content, currentContent, setContent } = useArticleCreate();

    const handleSetContentAnimateToX = (
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
    
    return (
        <div className="col-sm">
            <h4>{t("Animation")}</h4>
            {content[currentContent].tasks.map((task, taskIndex) => (
                <div key={task.id}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>{t("From")}</InputGroup.Text>
                        <Form.Control
                            placeholder="0"
                            value={task.animateTo.from.x}
                            onChange={(e) => handleSetContentAnimateFromX(e, currentContent, taskIndex)}
                        />
                        <Form.Control
                            placeholder="0"
                            value={task.animateTo.from.y}
                            onChange={(e) => handleSetContentAnimateFromY(e, currentContent, taskIndex)}
                        />
                        <InputGroup.Text>{t("To")}</InputGroup.Text>
                        <Form.Control
                            placeholder="0"
                            value={task.animateTo.to.x}
                            onChange={(e) => handleSetContentAnimateToX(e, currentContent, taskIndex)}
                        />
                        <Form.Control
                            placeholder="0"
                            value={task.animateTo.to.y}
                            onChange={(e) => handleSetContentAnimateToY(e, currentContent, taskIndex)}
                        />
                        <Button variant="danger" onClick={() => handleRemoveTask(currentContent, taskIndex)}>
                            <FaTrash/> {/* Trash bin check */}
                        </Button>
                    </InputGroup>
                </div>
            ))}
        </div>
    );
}