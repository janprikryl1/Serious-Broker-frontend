import {FC, useState} from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import { useArticleCreate } from "../../../../../../../../utils/providers/ArticleCreateProvider";
import { ContentNavigation } from "./ContentNavigation";
import {ListFilesModal} from "../imageUpload/ListFilesModal.tsx";
import {useModal} from "../../../../../../../../utils/hooks/useModal.tsx";

export const Content: FC = () => {
    const { t } = useTranslation();
    const { content, setContent, currentContent } = useArticleCreate();
    const { isOpen: isFileModalOpen, openModal: openFileModal, closeModal: closeFileModal } = useModal();
    const [currentTask, setCurrentTask] = useState<number>();
    const [currrentContent, setCurrrentContent] = useState<number>();

    const handleSetContentTitle = (value: string, contentIndex: number) => {
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === contentIndex) {
                    return { ...category, title: value };
                }
                return category;
            })
        );
    };
    
    const handleSetContentTask = (
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
                                return { ...task, task: e.target.value };
                            }
                            return task;
                        }),
                    };
                }
                return category;
            })
        );
    };

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

    const handleAddTask = () => {
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === currentContent) {
                    return {
                        ...category,
                        tasks: [
                            ...category.tasks,
                            {
                                id: category.tasks.length,
                                task: "",
                                image: "",
                                animateTo: { 
                                    from: { x: 0, y: 0 },
                                    to: { x: 0, y: 0 }
                                },
                            },
                        ],
                    };
                }
                return category;
            })
        );
    };
    
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
            
            <h2>{t("Content")}</h2>
            <InputGroup className="mb-3">
                <InputGroup.Text>{t("Category name")}</InputGroup.Text>
                <Form.Control
                    placeholder={t("Getting ready")}
                    value={content[currentContent].title}
                    onChange={(e) => handleSetContentTitle(e.target.value, currentContent)}
                />
            </InputGroup>
            <div className="row">
                <div className="col-sm-4">
                    <h4>{t("Image")}</h4>
                    {content[currentContent].tasks.map((task, taskIndex) => (
                        <div key={task.id}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>{t("Image")}</InputGroup.Text>
                                <Button
                                    onClick={() => {
                                        setCurrrentContent(currentContent);
                                        setCurrentTask(taskIndex);
                                        openFileModal();
                                    }}
                                >
                                    {task.image || t("Choose image")}
                                </Button>
                            </InputGroup>
                        </div>
                    ))}
                </div>
                <div className="col-sm">
                    <h4>{t("Task")}</h4>
                    {content[currentContent].tasks.map((task, taskIndex) => (
                        <div key={task.id}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>{t("Text")}</InputGroup.Text>
                                <Form.Control
                                    placeholder="..."
                                    value={task.task}
                                    onChange={(e) => handleSetContentTask(e, currentContent, taskIndex)}
                                />
                            </InputGroup>
                        </div>
                    ))}
                </div>
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
                            </InputGroup>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row">
                <div className="col-sm-16" style={{ textAlign: "center" }}>
                    <Button variant="warning" onClick={handleAddTask}>
                        +
                    </Button>
                </div>
            </div>
            <ContentNavigation />
        </>
    );
};
