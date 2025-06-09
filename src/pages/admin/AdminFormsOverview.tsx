import {FC, useEffect, useState} from "react";
import {closestCenter, DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors,} from "@dnd-kit/core";
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy,} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {RiDragMove2Fill} from "react-icons/ri";
import {Button, ButtonColor} from "../../components/reusable/Button.tsx";
import {ArticlesSkeleton} from "../../components/articles/ArticlesSkeleton.tsx";
import {useTranslation} from "react-i18next";
import {Question, QuestionType} from "../../utils/types/admin/Question.ts";
import {deleteQuestion, getAllQuestions, saveOrder} from "../../utils/api/formsService.ts";
import {FormQuestionCard} from "../../components/formQuestions/FormQuestionCard.tsx";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {adminURLS} from "../../utils/constants";

type SortableCardProps = {
    question: Question;
    onSave?: (updated: Question) => void;
    onDelete?: (id: number) => void;
    updateId: (oldId: number, newId: number) => void;
};

const SortableCard: FC<SortableCardProps> = ({ question, onSave, onDelete, updateId }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: question.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="row border rounded p-3 mb-3">
            <div
                className="drag-handle col-sm-1"
                {...attributes}
                {...listeners}
            >
                <RiDragMove2Fill />
            </div>
            <div className="col-sm-8">
                <FormQuestionCard question={question} onSave={onSave} deleteQuestion={onDelete} updateId={updateId} />
            </div>
        </div>
    );
};


export const AdminFormsOverview: FC = () => {
    const { t } = useTranslation();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );

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

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = questions.findIndex((q) => q.id === active.id);
            const newIndex = questions.findIndex((q) => q.id === over?.id);
            const newArray = arrayMove(questions, oldIndex, newIndex).map((q, i) => ({
                ...q,
                order: i + 1,
            }));
            setQuestions(newArray);
            await saveOrder(newArray.map((q) => ({ id: q.id, order: q.order })));
            toast.success(t("Order saved successfully"));
        }
    };
    
    const handleAddNewQuestion = () => {
        const newQuestion: Question = {
            id: Date.now(),
            order: questions.length + 1,
            type: QuestionType.text,
            required: false,
            question_text: t("New question"),
        };
        setQuestions(prev => [...prev, newQuestion]);
    }

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
                        <Button onClick={handleAddNewQuestion}>{t("New question")}</Button>
                        <Link to={adminURLS.formResponses} style={{marginLeft:20}}><Button color={ButtonColor.gray}>{t("Responses")}</Button></Link>

                        <div className="padding-top padding-bottom">
                            <div className="blog__wrapper">
                                <div className="row g-4">
                                    {isLoading ? (
                                        <ArticlesSkeleton />
                                    ) : (
                                        <DndContext
                                            sensors={sensors}
                                            collisionDetection={closestCenter}
                                            onDragEnd={handleDragEnd}
                                        >
                                            <SortableContext
                                                items={questions.map((q) => q.id)}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                {questions.map((question) => (
                                                    <SortableCard
                                                        key={question.id}
                                                        question={question}
                                                        onSave={(updated) => {
                                                            setQuestions((prev) =>
                                                                prev.map((q) =>
                                                                    q.id === updated.id ? updated : q
                                                                )
                                                            );
                                                        }}
                                                        onDelete={(id) => {
                                                            deleteQuestion(id);
                                                            setQuestions((prev) => prev.filter((q) => q.id !== id));
                                                        }}
                                                        updateId={(oldId: number, newId: number) => {
                                                            setQuestions((prev) => prev.map((q) => {
                                                                if (q.id === oldId) {
                                                                    return {
                                                                        ...q,
                                                                        id: newId
                                                                    };
                                                                }
                                                                return q;
                                                            }));
                                                        }}
                                                    />
                                                ))}
                                            </SortableContext>
                                        </DndContext>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
