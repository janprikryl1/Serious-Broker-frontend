import {FC, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {Question, QuestionType} from "../../utils/types/admin/Question";
import {Button, ButtonColor} from "../reusable/Button.tsx";
import {useTranslation} from "react-i18next";
import {FaRegTrashCan} from "react-icons/fa6";

type Props = {
    question: Question;
    onSave?: (updated: Question) => void;
};

export const FormQuestionCard: FC<Props> = ({question, onSave}) => {
    const {t} = useTranslation();
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
    } = useForm<Question>({
        defaultValues: question,
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "options" as never,
    });

    const watchType = watch("type");

    const onSubmit = (data: Question) => {
        const cleaned = {
            ...data,
            options:
                data.type === QuestionType.select
                    ? data.options?.filter(opt => opt.trim() !== "")
                    : undefined,
        };

        console.log("Ukládám otázku:", cleaned);
        onSave?.(cleaned);
        setIsEditing(false);
    };

    return (
        <div className="">
            {!isEditing ? (
                <>
                    <div className="fw-bold">{question.question_text}</div>
                    <div className="text-muted small">
                        {t("Type")}: {question.type}, {t("Required")}: {question.required ? t("Yes") : t("No")}, {t("Order")}: {question.order}
                    </div>
                    {question.type === QuestionType.select && question.options && question.options?.length > 0 && (
                        <ul className="ps-3 mt-2">
                            {question.options.map((opt, i) => (
                                <li key={i}>{opt}</li>
                            ))}
                        </ul>
                    )}
                    <Button className="btn btn-sm btn-outline-primary mt-2" onClick={() => setIsEditing(true)}>
                        {t("Edit")}
                    </Button>
                </>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                        <label className="form-label">{t("Question text")}</label>
                        <input {...register("question_text", {required: true})} className="form-control"/>
                    </div>

                    <div className="mb-2">
                        <label className="form-label">{t("Question type")}</label>
                        <select {...register("type")} className="form-select">
                            {Object.values(QuestionType).map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-check mb-2">
                        <input type="checkbox" {...register("required")} className="form-check-input" id={`required-${question.id}`}/>
                        <label className="form-check-label" htmlFor={`required-${question.id}`}>{t("Required")}</label>
                    </div>

                    {watchType === QuestionType.select && (
                        <div className="mb-3">
                            <label className="form-label">{t("Options")}</label>
                            {fields.map((field, index) => (
                                <div key={field.id} className="input-group mb-1">
                                    <input {...register(`options.${index}` as const)} className="form-control"/>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => remove(index)}>
                                        <FaRegTrashCan />
                                    </button>
                                </div>
                            ))}
                            <Button type="button" className="btn btn-sm btn-outline-secondary mt-1" onClick={() => append("")}>
                                {t("Add option")}
                            </Button>
                        </div>
                    )}

                    <div className="d-flex gap-2 mt-3">
                        <Button type="submit" color={ButtonColor.green}>{t("Save")}</Button>
                        <Button type="button" color={ButtonColor.gray} onClick={() => {
                            reset(question);
                            setIsEditing(false);
                        }}>{t("Cancel")}</Button>
                    </div>
                </form>
            )}
        </div>
    );
};
