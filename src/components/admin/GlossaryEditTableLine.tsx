import { FC, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { deleteGlossary, editGlossary } from "../../utils/api/glossaryService.ts";
import { glossaryImagesURL } from "../../utils/constants";
import { Button, ButtonColor } from "../reusable/Button.tsx";
import { CustomSwal } from "../../utils/functions/customSwal.ts";
import { GlossaryType } from "../../utils/types/article/GlossaryType.ts";

type Props = {
    glossary: GlossaryType;
    onUpdate: (updatedGlossary: GlossaryType) => void;
    onDelete: (id: number) => void;
};

export const GlossaryEditTableLine: FC<Props> = ({ glossary, onUpdate, onDelete }) => {
    const { t } = useTranslation();
    const {
        control,
        handleSubmit,
        watch,
        register,
        reset
    } = useForm<GlossaryType & { imageFile?: File }>({
        defaultValues: {
            ...glossary,
            imageFile: undefined,
        },
    });
    const imageFile = watch("imageFile");

    useEffect(() => {
        reset(glossary);
    }, [glossary]);

    const onSubmit = async (data: GlossaryType & { imageFile?: File }) => {
        try {
            const updatedGlossary: GlossaryType = {
                ...glossary,
                ...data,
                image: data.imageFile ? data.imageFile.name : glossary.image,
            };
            const result = await editGlossary(updatedGlossary, data.imageFile || null);
            if (result?.data.status === "success") {
                CustomSwal.fire({
                    title: t("Glossary updated"),
                    text: t("The glossary was successfully updated."),
                    icon: "success",
                });
                onUpdate(updatedGlossary);
            } else {
                throw new Error("Update failed");
            }
        } catch (error) {
            CustomSwal.fire({
                title: t("Glossary update failed"),
                text: t("Try again later."),
                icon: "error",
            });
        }
    };

    const handleDelete = async () => {
        try {
            const result = await deleteGlossary(glossary.id);
            if (!result) return;
            CustomSwal.fire({
                title: t("Glossary deleted"),
                text: t("The glossary was successfully deleted."),
                icon: "success",
            });
            onDelete(glossary.id);
        } catch (error) {
            CustomSwal.fire({
                title: t("Glossary deletion failed"),
                text: t("Try again later."),
                icon: "error",
            });
        }
    };

    return (
        <tr>
            <td><input {...register("title")} className="contact-input" /></td>
            <td><input {...register("title_cs")} className="contact-input" /></td>
            <td><input {...register("answer")} className="contact-input" /></td>
            <td><input {...register("answer_cs")} className="contact-input" /></td>
            <td>
                <Controller
                    control={control}
                    name="imageFile"
                    render={({ field }) => (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={(e) => field.onChange(e.target.files?.[0])}
                            />
                            {glossary.image && !imageFile && (
                                <Link to={`${glossaryImagesURL}${glossary.image}`}>
                                    {glossary.image}
                                </Link>
                            )}
                            {imageFile && imageFile.name}
                        </>
                    )}
                />
            </td>
            <td>
                <Button color={ButtonColor.red} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </td>
            <td>
                <Button onClick={handleSubmit(onSubmit)}>
                    {t("Save")}
                </Button>
            </td>
        </tr>
    );
};
