import { FC, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Question, QuestionType } from "../../utils/types/admin/Question";
import { Button, ButtonColor } from "../reusable/Button.tsx";
import { useTranslation } from "react-i18next";
import { FaRegTrashCan } from "react-icons/fa6";
import { saveQuestion } from "../../utils/api/formsService.ts";
import {ToastColor, useToast} from "../../utils/providers/ToastProvider.tsx";
import {formImagesURL} from "../../utils/constants";

type Props = {
    question: Question;
    onSave?: (updated: Question) => void;
    deleteQuestion?: (id: number) => void;
    updateId: (oldId: number, newId: number) => void;
    category: string;
};

export const FormQuestionCard: FC<Props> = ({ question, onSave, deleteQuestion, updateId, category }) => {
    const { t } = useTranslation();
    const { showToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
    } = useForm<Question>({
        defaultValues: question,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "options" as never,
    });

    const watchType = watch("type");

    const onSubmit = async (data: Question) => {
        const cleaned: Question = {
            ...data,
            // @ts-ignore
            category,
            options: data.type === QuestionType.select
                ? data.options?.filter(opt => opt.text.trim() !== "") ?? []
                : null,
        };

        const formData = new FormData();
        formData.append("question_text", cleaned.question_text);
        formData.append("type", cleaned.type);
        formData.append("required", cleaned.required ? "1" : "0");
        formData.append("order", cleaned.order.toString());
        formData.append("category", category);
        if (cleaned.description) formData.append("description", cleaned.description);
        if (cleaned.options) formData.append("options", JSON.stringify(cleaned.options));
        if (question.id && question.id < 999999999) formData.append("id", question.id.toString());
        if (imageFile) formData.append("image", imageFile);

        const response = await saveQuestion(formData);

        if (response?.status === 200) {
            const updated = { ...cleaned, image_url: response.data.image_url ?? question.image_url };
            onSave?.(updated);
            updateId(question.id, response.data.id ?? question.id);
            setIsEditing(false);
            showToast(t("Saved successfully"), ToastColor.green);
        }
    };


    return (
        <div className="">
            {!isEditing ? (
                <>
                    <div className="fw-bold">{question.question_text}</div>
                    <div className="text-muted small">
                        {t("Type")}: {question.type}, {t("Required")}: {question.required ? t("Yes") : t("No")}, {t("Order")}: {question.order}
                    </div>
                    {question.type === QuestionType.select && question.options && question.options.length > 0 && (
                        <ul className="ps-3 mt-2">
                            {question.options.map((opt, i) => (
                                <li key={i}>
                                    {opt.text} — {opt.points} {t("points")}
                                </li>
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
                        <input type="checkbox" {...register("required")} className="form-check-input"
                               id={`required-${question.id}`}/>
                        <label className="form-check-label" htmlFor={`required-${question.id}`}>{t("Required")}</label>
                    </div>

                    {watchType === QuestionType.select && (
                        <div className="mb-3">
                            <label className="form-label">{t("Options with points")}</label>
                            {fields.map((field, index) => (
                                <div key={field.id} className="input-group mb-2">
                                    <input
                                        {...register(`options.${index}.text` as const)}
                                        className="form-control"
                                        placeholder={t("Option text")}
                                    />
                                    <input
                                        type="number"
                                        {...register(`options.${index}.points` as const)}
                                        className="form-control"
                                        placeholder={t("Points")}
                                    />
                                    <button type="button" className="btn btn-outline-danger"
                                            onClick={() => remove(index)}>
                                        <FaRegTrashCan/>
                                    </button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                className="btn btn-sm btn-outline-secondary mt-1"
                                onClick={() => append({text: "", points: 0})}
                            >
                                {t("Add option")}
                            </Button>
                        </div>
                    )}
                    <div className="mb-2">
                        <label className="form-label">{t("Image (optional)")}</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setImageFile(e.target.files[0]);
                                } else {
                                    setImageFile(null);
                                }
                            }}
                        />
                    </div>
                    {question.image_url && (
                        <div className="mt-2">
                            <img src={formImagesURL+question.image_url} alt="Question" className="img-fluid" style={{ maxHeight: 150 }} />
                        </div>
                    )}

                    <div className="d-flex gap-2 mt-3">
                        <Button type="submit" color={ButtonColor.green}>{t("Save")}</Button>
                        <Button type="button" color={ButtonColor.gray} onClick={() => {
                            reset(question);
                            setIsEditing(false);
                        }}>{t("Cancel")}</Button>
                        <Button type="button" color={ButtonColor.red} onClick={() => {
                            deleteQuestion?.(question.id);
                        }}><FaRegTrashCan/></Button>
                    </div>
                </form>
            )}
        </div>
    );
};
