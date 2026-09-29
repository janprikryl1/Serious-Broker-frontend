import { FC, useEffect, useState } from "react";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDragMove2Fill } from "react-icons/ri";
import { Button, ButtonColor } from "../../components/reusable/Button.tsx";
import { ArticlesSkeleton } from "../../components/articles/ArticlesSkeleton.tsx";
import { useTranslation } from "react-i18next";
import {
    CategorizedQuestions,
    Question,
    QuestionType
} from "../../utils/types/admin/Question.ts";
import {
    deleteQuestion,
    getAllQuestions,
    saveOrder
} from "../../utils/api/formsService.ts";
import { FormQuestionCard } from "../../components/formQuestions/FormQuestionCard.tsx";
import { Link } from "react-router-dom";
import { adminURLS } from "../../utils/constants";
import {showToast} from "../../components/toast/toastHelper.tsx";

export const AdminFormsOverview: FC = () => {
    const { t } = useTranslation();
    const [questions, setQuestions] = useState<CategorizedQuestions>({
        "Jaký jsem investor": [],
        "Jak znám krypto": [],
        "Co mám nakupovat": []
    });
    const [isLoading, setIsLoading] = useState(true);

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getAllQuestions();
                if (response?.data) {
                    setQuestions(response.data);
                }
            } catch (error) {
                console.error("Chyba při načítání otázek:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, []);

    const handleDragEnd = async (
        event: DragEndEvent,
        category: keyof CategorizedQuestions
    ) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const current = [...questions[category]];
            const oldIndex = current.findIndex((q) => q.id === active.id);
            const newIndex = current.findIndex((q) => q.id === over?.id);
            const newArray = arrayMove(current, oldIndex, newIndex).map((q, i) => ({
                ...q,
                order: i + 1
            }));

            setQuestions((prev) => ({
                ...prev,
                [category]: newArray
            }));

            await saveOrder(
                newArray.map((q) => ({
                    id: q.id,
                    order: q.order,
                    category
                }))
            );

            showToast.success(t("Order saved successfully"));
        }
    };

    const handleAddNewQuestion = (category: string) => {
        const newQuestion: Question = {
            id: Date.now(),
            order: questions[category as keyof CategorizedQuestions].length + 1,
            type: QuestionType.text,
            required: false,
            question_text: t("New question"),
            description: null,
            image_url: null,
            options: []
        };

        setQuestions((prev) => ({
            ...prev,
            [category]: [...prev[category as keyof CategorizedQuestions], newQuestion]
        }));
    };

    return (
        <div className="padding-bottom admin-container">
            <div className="service-details__wrapper">
                <div className="service-details__item">
                    <div
                        className="service-details__content"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <h3 className="admin-section-title">{t("Forms")}</h3>
                        <Link to={adminURLS.formResponses} style={{ marginBottom: 20 }}>
                            <Button color={ButtonColor.gray2}>{t("Responses")}</Button>
                        </Link>
                        <Link to={adminURLS.formEvaulationSettings} style={{ marginBottom: 20, marginLeft: 10 }}>
                            <Button color={ButtonColor.gold}>{t("Evaulation settings")}</Button>
                        </Link>

                        <div className="padding-top padding-bottom">
                            {isLoading ? (
                                <ArticlesSkeleton />
                            ) : (
                                Object.entries(questions).map(([category, qList]) => (
                                    <div key={category} className="mb-5">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h4>{category}</h4>
                                            <Button onClick={() => handleAddNewQuestion(category)}>
                                                + {t("New question")}
                                            </Button>
                                        </div>

                                        <DndContext
                                            sensors={sensors}
                                            collisionDetection={closestCenter}
                                            onDragEnd={(event) =>
                                                handleDragEnd(event, category as keyof CategorizedQuestions)
                                            }
                                        >
                                            <SortableContext
                                                items={qList.map((q) => q.id)}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                {qList.map((question) => (
                                                    <SortableCard
                                                        key={question.id}
                                                        question={question}
                                                        category={category}
                                                        onSave={(updated) => {
                                                            setQuestions((prev) => ({
                                                                ...prev,
                                                                [category]: prev[category as keyof CategorizedQuestions].map((q) =>
                                                                    q.id === updated.id ? updated : q
                                                                )
                                                            }));
                                                        }}
                                                        onDelete={(id) => {
                                                            deleteQuestion(id);
                                                            setQuestions((prev) => ({
                                                                ...prev,
                                                                [category]: prev[category as keyof CategorizedQuestions].filter(
                                                                    (q) => q.id !== id
                                                                )
                                                            }));
                                                        }}
                                                        updateId={(oldId, newId) => {
                                                            setQuestions((prev) => ({
                                                                ...prev,
                                                                [category]: prev[category as keyof CategorizedQuestions].map((q) =>
                                                                    q.id === oldId ? { ...q, id: newId } : q
                                                                )
                                                            }));
                                                        }}
                                                    />
                                                ))}
                                            </SortableContext>
                                        </DndContext>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SortableCard: FC<{
    question: Question;
    onSave?: (updated: Question) => void;
    onDelete?: (id: number) => void;
    updateId: (oldId: number, newId: number) => void;
    category: string;
}> = ({ question, onSave, onDelete, updateId, category }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: question.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div ref={setNodeRef} style={style} className="row border rounded p-3 mb-3">
            <div className="drag-handle col-sm-1" {...attributes} {...listeners}>
                <RiDragMove2Fill />
            </div>
            <div className="col-sm-8">
                <FormQuestionCard
                    question={question}
                    onSave={onSave}
                    deleteQuestion={onDelete}
                    updateId={updateId}
                    category={category}
                />
            </div>
        </div>
    );
};
