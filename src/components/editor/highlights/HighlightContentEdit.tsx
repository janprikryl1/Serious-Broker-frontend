import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Input } from "@mui/joy";
import {useHighlightContext} from "../../../utils/providers/HighlightProvider.tsx";
import {HighlightType} from "../../../utils/types/highlights/HighlightType.ts";
import {Button} from "../../reusable/Button.tsx";
import "../../../styles/sass/components/ContactUs.scss";

export const HighlightContentEdit: FC = () => {
    const { t } = useTranslation();
    const { highlightData, saveChanges } = useHighlightContext();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<HighlightType>({
        defaultValues: highlightData || {},
    });

    useEffect(() => {
        if (highlightData) {
            setValue("title", highlightData.title);
            setValue("title_cs", highlightData.title_cs);
            setValue("description", highlightData.description);
            setValue("description_cs", highlightData.description_cs);
        }
    }, [highlightData, setValue]);

    const onSubmit = (data: HighlightType) => {
        saveChanges(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="title">{t("Title")}</label>
                <Input {...register("title", {required: t("Title is required")})} className="contact-input" required/>
                {errors.title && <span>{errors.title.message}</span>}
            </div>

            <div className="mt-2">
                <label htmlFor="title_cs">{t("Title in Czech")}</label>
                <Input {...register("title_cs", {required: t("Czech title is required")})} className="contact-input"
                       required/>
                {errors.title_cs && <span>{errors.title_cs.message}</span>}
            </div>

            <div className="mt-2">
                <label htmlFor="description">{t("Description")}</label>
                <textarea
                    {...register("description", {required: t("Description is required")})}
                    className="contact-input"
                />
                {errors.description && <span>{errors.description.message}</span>}
            </div>

            <div className="mt-2">
                <label htmlFor="description_cs">{t("Description (cs)")}</label>
                <textarea
                    {...register("description_cs", {required: t("Czech description is required")})}
                    className="contact-input"
                />
                {errors.description_cs && <span>{errors.description_cs.message}</span>}
            </div>
            <div className="contact-button-wrapper">
                <Button type="submit">{t("Save")}</Button>
            </div>
        </form>
);
};
