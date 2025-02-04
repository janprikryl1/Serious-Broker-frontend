import { FC, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { GlossaryType } from "../../utils/types/GlossaryType.ts";
import { getGlossary, addGlossary } from "../../api/glossaryService.ts";
import { useTranslation } from "react-i18next";
import { TableLogSkeleton } from "../../components/modules/admin/TableLogSkeleton.tsx";
import { GlossaryEditTableLine } from "../../components/modules/admin/GlossaryEditTableLine.tsx";
import Swal from "sweetalert2";

export const GlossaryManagement: FC = () => {
    const { t } = useTranslation();
    const [glossaries, setGlossaries] = useState<GlossaryType[]>([]);
    const [newGlossary, setNewGlossary] = useState<Partial<GlossaryType & { imageFile: File | null }>>({
        title: "",
        title_cs: "",
        answer: "",
        answer_cs: "",
        image: null,
        imageFile: null,
    });

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
        setGlossaries((prevGlossaries) =>
            prevGlossaries.map((glossary) =>
                glossary.id === updatedGlossary.id ? updatedGlossary : glossary
            )
        );
    };

    const handleNewGlossaryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setNewGlossary((prev) => ({
                ...prev,
                imageFile: files?.[0] || null,
                image: files?.[0]?.name || null,
            }));
        } else {
            setNewGlossary((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddGlossary = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const glossaryToSubmit = {
                ...newGlossary,
                image: newGlossary.imageFile ? newGlossary.imageFile.name : null,
            };

            const result = await addGlossary(glossaryToSubmit);
            if (!result) return;
            if (result.data.status === "success") {
                setGlossaries((prev) => [...prev, result.data.data]);
                setNewGlossary({
                    title: "",
                    title_cs: "",
                    answer: "",
                    answer_cs: "",
                    image: null,
                    imageFile: null,
                });
                Swal.fire({
                    title: t("Glossary added"),
                    text: t("The glossary was successfully added."),
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: t("Glossary addition failed"),
                    text: t("Try again later."),
                    icon: "error",
                });
            }
        } catch (error) {
            console.error("Error adding glossary:", error);
            Swal.fire({
                title: t("Glossary addition failed"),
                text: t("Try again later."),
                icon: "error",
            });
        }
    };

    const handleGlossaryDelete = (id: number) => {
        setGlossaries((prevGlossaries) =>
            prevGlossaries.filter((glossary) => glossary.id !== id)
        );
    };

    return (
        <div className="padding-bottom">
                <div className="service-details__wrapper">
                    <div className="service-details__item">
                        <div className="service-details__item-inner">
                            <div
                                className="service-details__content"
                                data-aos="fade-up"
                                data-aos-duration="900"
                            >
                                <form onSubmit={handleAddGlossary} className="mb-4">
                                    <h1 className="card-title">{t("Add New Glossary Entry")}</h1>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <input
                                                type="text"
                                                name="title"
                                                value={newGlossary.title || ""}
                                                onChange={handleNewGlossaryChange}
                                                placeholder={t("Title")}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <input
                                                type="text"
                                                name="title_cs"
                                                value={newGlossary.title_cs || ""}
                                                onChange={handleNewGlossaryChange}
                                                placeholder={t("Title in Czech")}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <input
                                                type="text"
                                                name="answer"
                                                value={newGlossary.answer || ""}
                                                onChange={handleNewGlossaryChange}
                                                placeholder={t("Answer")}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <input
                                                type="text"
                                                name="answer_cs"
                                                value={newGlossary.answer_cs || ""}
                                                onChange={handleNewGlossaryChange}
                                                placeholder={t("Answer in Czech")}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <input
                                                type="file"
                                                name="image"
                                                onChange={handleNewGlossaryChange}
                                                placeholder={t("Image")}
                                                accept="image/*"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <button type="submit" className="btn btn-primary">
                                                {t("Add Glossary Entry")}
                                            </button>
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
