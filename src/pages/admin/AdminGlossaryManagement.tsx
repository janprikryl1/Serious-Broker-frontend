import { FC, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { addGlossary, getGlossary } from "../../utils/api/glossaryService";
import { Button } from "../../components/reusable/Button";
import { GlossaryEditTableLine } from "../../components/admin/GlossaryEditTableLine";
import { TableLogSkeleton } from "../../components/admin/TableLogSkeleton";
import { CustomSwal } from "../../utils/functions/customSwal";
import { GlossaryType } from "../../utils/types/article/GlossaryType";
import { defaultNewGlossaryItem } from "../../utils/constants/defaultContent";
import "../../styles/sass/components/contact_us.scss";

type NewGlossaryForm = Omit<GlossaryType, "id"> & { imageFile?: File | null };

export const AdminGlossaryManagement: FC = () => {
    const { t } = useTranslation();
    const [glossaries, setGlossaries] = useState<GlossaryType[]>([]);

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch
    } = useForm<NewGlossaryForm>({
        defaultValues: {
            ...defaultNewGlossaryItem,
            imageFile: null,
        },
    });

    const imageFile = watch("imageFile");

    useEffect(() => {
        const loadGlossary = async () => {
            try {
                const res = await getGlossary();
                setGlossaries(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        loadGlossary();
    }, []);

    const handleGlossaryUpdate = (updatedGlossary: GlossaryType) => {
        setGlossaries((prev) =>
            prev.map((glossary) =>
                glossary.id === updatedGlossary.id ? updatedGlossary : glossary
            )
        );
    };

    const handleGlossaryDelete = (id: number) => {
        setGlossaries((prev) => prev.filter((g) => g.id !== id));
    };

    const onSubmit = async (data: NewGlossaryForm) => {
        try {
            const glossaryToSubmit = {
                ...data,
                image: data.imageFile ? data.imageFile.name : null,
            };

            const result = await addGlossary(glossaryToSubmit);
            if (result?.data.status === "success") {
                setGlossaries((prev) => [...prev, result.data.data]);
                reset();
                CustomSwal.fire({
                    title: t("Glossary added"),
                    text: t("The glossary was successfully added."),
                    icon: "success",
                });
            } else {
                throw new Error("Glossary creation failed");
            }
        } catch (error) {
            console.error("Error adding glossary:", error);
            CustomSwal.fire({
                title: t("Glossary addition failed"),
                text: t("Try again later."),
                icon: "error",
            });
        }
    };

    return (
        <div className="padding-bottom">
            <div className="service-details__wrapper">
                <div className="service-details__item">
                    <div className="service-details__item-inner">
                        <div className="service-details__content" data-aos="fade-up" data-aos-duration="900">
                            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                                <h1 className="card-title">{t("Add New Glossary Entry")}</h1>
                                <br />
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        <input
                                            {...register("title")}
                                            placeholder={t("Title")}
                                            className="contact-input"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <input
                                            {...register("title_cs")}
                                            placeholder={t("Title in Czech")}
                                            className="contact-input"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <input
                                            {...register("answer")}
                                            placeholder={t("Answer")}
                                            className="contact-input"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <input
                                            {...register("answer_cs")}
                                            placeholder={t("Answer in Czech")}
                                            className="contact-input"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <Controller
                                            control={control}
                                            name="imageFile"
                                            render={({ field }) => (
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="contact-input"
                                                    onChange={(e) => field.onChange(e.target.files?.[0])}
                                                />
                                            )}
                                        />
                                        {imageFile && imageFile.name}
                                    </div>
                                    <div className="col-md-12">
                                        <Button type="submit" className="btn btn-primary">
                                            {t("Add Glossary Entry")}
                                        </Button>
                                    </div>
                                </div>
                            </form>

                            {glossaries.length ? (
                                <>
                                    <h1 className="card-title">{t("Glossary")}</h1>
                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>{t("Title")}</th>
                                                <th>{t("Title in Czech")}</th>
                                                <th>{t("Answer")}</th>
                                                <th>{t("Answer in Czech")}</th>
                                                <th>{t("Image")}</th>
                                                <th>{t("Delete")}</th>
                                                <th>{t("Edit")}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {glossaries.map((glossary) => (
                                                <GlossaryEditTableLine
                                                    key={glossary.id}
                                                    glossary={glossary}
                                                    onUpdate={handleGlossaryUpdate}
                                                    onDelete={handleGlossaryDelete}
                                                />
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            ) : (
                                <TableLogSkeleton />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
