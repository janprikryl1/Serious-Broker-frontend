import { FC, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, ButtonColor } from "../reusable/Button.tsx";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../utils/providers/providerUser.tsx";
import { UserType } from "../../utils/types/user/userTypes.ts";
import {
    getAllQuestions,
    saveUserResponses
} from "../../utils/api/formsService.ts";
import {
    Question,
    QuestionType,
    CategorizedQuestions,
    QuestionOption
} from "../../utils/types/admin/Question.ts";
import { useForm, SubmitHandler } from "react-hook-form";
import {ToastColor, useToast} from "../../utils/providers/ToastProvider.tsx";
import Skeleton from "react-loading-skeleton";
import {formImagesURL} from "../../utils/constants";

type FormInputs = {
    [key: string]: string | number | boolean;
};

type QuestionWithCategory = Question & { category: string };

export const UserFormFillModal: FC = () => {
    const { t } = useTranslation();
    const { user, setUser, setFilledForm } = useUserContext();
    const { showToast } = useToast();
    const [questions, setQuestions] = useState<QuestionWithCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [evaluationResult, setEvaluationResult] = useState<{
        total_score: number;
        category_scores: Record<string, number>;
        evaluation: { name: string; description: string } | null;
    } | null>(null);

    
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger
    } = useForm<FormInputs>({ mode: "onChange" });

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true);
                const result = await getAllQuestions();
                if (result?.data) {
                    const categorized = result.data as CategorizedQuestions;

                    const flattenedQuestions: QuestionWithCategory[] = Object.entries(
                        categorized
                    )
                        .flatMap(([category, questionList]) =>
                            questionList.map((q) => ({ ...q, category }))
                        )
                        .sort((a, b) => {
                            const categoryOrder = [
                                "Jaký jsem investor",
                                "Jak znám krypto",
                                "Co mám nakupovat"
                            ];

                            const categoryAIndex = categoryOrder.indexOf(a.category);
                            const categoryBIndex = categoryOrder.indexOf(b.category);

                            if (categoryAIndex !== categoryBIndex) {
                                return categoryAIndex - categoryBIndex;
                            }

                            return a.order - b.order;
                        });

                    setQuestions(flattenedQuestions);
                }
            } catch (error) {
                console.error("Error fetching questions:", error);
                showToast(t("Error loading questions"), ToastColor.red);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [t]);

    const handleClose = () => {
        setUser({ ...user, has_filled_form: true } as UserType);
        setFilledForm(false);
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const answersArray = Object.keys(data).map((questionId) => ({
            question_id: Number(questionId),
            value: data[questionId]
        }));

        const payload = {
            user_id: user!.id,
            answers: answersArray
        };

        try {
            const res = await saveUserResponses(payload);

            if (res?.data) {
                showToast(t("Questionnaire submitted successfully!"), ToastColor.green);
                setEvaluationResult(res.data);
            }
        } catch (error) {
            console.error("Error submitting responses:", error);
            showToast(t("There was an error submitting your answers."), ToastColor.red);
        }
    };

    const handleNext = async () => {
        const currentQuestion = questions[currentQuestionIndex];
        const isFieldValid = await trigger(String(currentQuestion.id));

        if (!isFieldValid) return;

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            await handleSubmit(onSubmit)();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const renderQuestionInput = (question: Question) => {
        const inputName = String(question.id);
        const validationRules = { required: question.required };
        const commonProps = {
            className: "form-control",
            ...register(inputName, validationRules)
        };

        switch (question.type) {
            case QuestionType.text:
                return <input type="text" {...commonProps} />;
            case QuestionType.number:
                return <input type="number" {...commonProps} />;
            case QuestionType.date:
                return <input type="date" {...commonProps} />;
            case QuestionType.boolean:
                return (
                    <select {...commonProps} className="form-select">
                        <option value="">{t("Select an option")}</option>
                        <option value="true">{t("Yes")}</option>
                        <option value="false">{t("No")}</option>
                    </select>
                );
            case QuestionType.select:
                return (
                    <select {...commonProps} className="form-select">
                        <option value="">{t("Select an option")}</option>
                        {question.options?.map((option: QuestionOption, index: number) => (
                            <option key={index} value={option.text}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                );
            default:
                return <p>{t("Unsupported question type")}</p>;
        }
    };

    const currentQuestion = questions?.[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <Modal show={true} onHide={handleClose} backdrop="static" keyboard={false} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{t("Questionnaire")}</Modal.Title>
            </Modal.Header>
            {evaluationResult === null ? (
                <>
                    <Modal.Body>
                        {!isLoading && currentQuestion ? (
                            <>
                                <p className="mb-3 fw-bold" style={{ fontSize: 20 }}>
                                    {currentQuestion.category}
                                </p>

                                <form onSubmit={handleSubmit(onSubmit)} key={currentQuestion.id} id="user-questionnaire-form">
                                    <div className="mb-3">
                                        <label htmlFor={String(currentQuestion.id)} className="form-label fw-bold">
                                            {currentQuestionIndex + 1}. {currentQuestion.question_text}
                                            {currentQuestion.required && <span className="text-danger">*</span>}
                                        </label>
                                        {currentQuestion.image_url && (
                                            <div className="mb-3 text-center">
                                                <img
                                                    src={formImagesURL+currentQuestion.image_url}
                                                    alt="question"
                                                    className="img-fluid rounded shadow-sm"
                                                    style={{ maxHeight: 200, objectFit: "contain" }}
                                                />
                                            </div>
                                        )}
                                        {renderQuestionInput(currentQuestion)}
                                        {errors[currentQuestion.id] && (
                                            <p className="text-danger small mt-1">{t("Required")}</p>
                                        )}
                                    </div>
                                </form>
                            </>
                        ) : (
                            <Skeleton />
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        {!isLoading && questions.length > 0 && (
                            <div className="d-flex justify-content-end w-100 gap-2">
                                {currentQuestionIndex > 0 && (
                                    <Button color={ButtonColor.gray2} onClick={handlePrevious}>
                                        {t("Previous")}
                                    </Button>
                                )}
                                <Button onClick={handleNext}>
                                    {isLastQuestion ? t("Submit") : t("Next")}
                                </Button>
                            </div>
                        )}
                    </Modal.Footer>
                </>
            ) : (
                <Modal.Body>
                    <div className="p-3 border rounded">
                        <h5 className="fw-bold">{t("Your result")}</h5>
                        <p>
                            <strong>{t("Evaluation")}:</strong> {evaluationResult.evaluation?.name}
                        </p>
                        <p>
                            <strong>{t("Description")}:</strong> {evaluationResult.evaluation?.description}
                        </p>
                        <p>
                            <strong>{t("Total score")}:</strong> {evaluationResult.total_score} {t("points")}
                        </p>
                        
                        <Button className="mt-3" onClick={handleClose}>
                            {t("Close")}
                        </Button>
                    </div>
                </Modal.Body>
            )}
        </Modal>
    );
};
