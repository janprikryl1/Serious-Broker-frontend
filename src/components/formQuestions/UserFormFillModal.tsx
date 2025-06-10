import {FC, useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {Button, ButtonColor} from "../reusable/Button.tsx";
import {useTranslation} from "react-i18next";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {UserType} from "../../utils/types/user/userTypes.ts";
import {getAllQuestions, saveUserResponses} from "../../utils/api/formsService.ts";
import {Question, QuestionType} from "../../utils/types/admin/Question.ts";
import {useForm, SubmitHandler} from "react-hook-form";
import {toast} from "react-toastify";
import Skeleton from "react-loading-skeleton";

type FormInputs = {
    [key: string]: string | number | boolean;
};

export const UserFormFillModal: FC = () => {
    const {t} = useTranslation();
    const {user, setUser} = useUserContext();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const {
        register,
        handleSubmit,
        formState: {errors},
        trigger,
    } = useForm<FormInputs>({mode: "onChange"});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true);
                const result = await getAllQuestions();
                if (result?.data) {
                    const sortedQuestions = result.data.sort((a, b) => a.order - b.order);
                    setQuestions(sortedQuestions);
                }
            } catch (error) {
                console.error("Error fetching questions:", error);
                toast.error(t("Error loading questions"));
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [t]);

    const handleClose = () => {
        setUser({...user, has_filled_form: true} as UserType);
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const answersArray = Object.keys(data).map(questionId => ({
            question_id: Number(questionId),
            value: data[questionId],
        }));
        
        const payload = {
            user_id: user!.id,
            answers: answersArray,
        };

        console.log("Odesílám payload:", JSON.stringify(payload, null, 2));

        try {
            await saveUserResponses(payload);
            toast.success(t("Questionnaire submitted successfully!"));
            handleClose();
        } catch (error) {
            console.error("Error submitting responses:", error);
            toast.error(t("There was an error submitting your answers."));
        }
    };

    const handleNext = async () => {
        const currentQuestion = questions[currentQuestionIndex];
        const isFieldValid = await trigger(String(currentQuestion.id));

        if (!isFieldValid) return;

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            await handleSubmit(onSubmit)();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
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
                        {question.options?.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                );
            default:
                return <p>Unsupported question type</p>;
        }
    }

    const currentQuestion = questions?.[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <Modal show={true} onHide={handleClose} backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("Questionnaire")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!isLoading && currentQuestion ? (
                    <form onSubmit={handleSubmit(onSubmit)} key={currentQuestion.id} id="user-questionnaire-form">
                        <div className="mb-3">
                            <label htmlFor={String(currentQuestion.id)} className="form-label fw-bold">
                                {currentQuestionIndex + 1}. {currentQuestion.question_text}
                                {currentQuestion.required && <span className="text-danger">*</span>}
                            </label>
                            {renderQuestionInput(currentQuestion)}
                            {errors[currentQuestion.id] && (
                                <p className="text-danger small mt-1">{t("form.validation.required")}</p>
                            )}
                        </div>
                    </form>
                ) : <Skeleton />}
            </Modal.Body>
            <Modal.Footer>
                {!isLoading && questions.length > 0 && (
                    <div className="d-flex justify-content-end w-100 gap-2">
                        {currentQuestionIndex > 0 && (
                            <Button color={ButtonColor.gray} onClick={handlePrevious}>
                                {t("Previous")}
                            </Button>
                        )}
                        <Button onClick={handleNext}>
                            {isLastQuestion ? t("Submit") : t("Next")}
                        </Button>
                    </div>
                )}
            </Modal.Footer>
        </Modal>
    );
};