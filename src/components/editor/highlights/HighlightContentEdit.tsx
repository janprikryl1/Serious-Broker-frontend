import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Input } from "@mui/joy";
import {useHighlightContext} from "../../../utils/providers/HighlightProvider.tsx";
import {HighlightType} from "../../../utils/types/highlights/HighlightType.ts";
import {Button} from "../../reusable/Button.tsx";

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
                <Input {...register("title", { required: t("Title is required") })} required />
                {errors.title && <span>{errors.title.message}</span>}
            </div>

            <div className="mt-2">
                <label htmlFor="title_cs">{t("Title in Czech")}</label>
                <Input {...register("title_cs", {required: t("Czech title is required")})} required/>
                {errors.title_cs && <span>{errors.title_cs.message}</span>}
            </div>

            <div className="mt-2">
                <label htmlFor="description">{t("Description")}</label>
                <textarea
                    style={{backgroundColor: "white", color: "black", padding: "10px"}}
                    {...register("description", {required: t("Description is required")})}
                />
                {errors.description && <span>{errors.description.message}</span>}
            </div>

            <div className="mt-2">
                <label htmlFor="description_cs">{t("Description (cs)")}</label>
                <textarea
                    style={{ backgroundColor: "white", color: "black", padding: "10px" }}
                    {...register("description_cs", { required: t("Czech description is required") })}
                />
                {errors.description_cs && <span>{errors.description_cs.message}</span>}
            </div>
            <Button type="submit" className="mt-4 mb-5">{t("Save")}</Button>
        </form>
    );
};
