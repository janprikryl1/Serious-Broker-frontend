import { ChangeEvent, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { GlossaryType } from "../../../utils/types/GlossaryType.ts";
import { deleteGlossary, editGlossary } from "../../../api/glossaryService.ts";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

type Props = {
    glossary: GlossaryType;
    onUpdate: (updatedGlossary: GlossaryType) => void;
    onDelete: (id: number) => void;
};

export const GlossaryEditTableLine: FC<Props> = ({ glossary, onUpdate, onDelete }) => {
    const { t } = useTranslation();

    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>, field: keyof GlossaryType) => {
        onUpdate({ ...glossary, [field]: e.target.value });
    };

    const handleDelete = async () => {
        try {
            const result = await deleteGlossary(glossary.id);
            if (!result) return;
            Swal.fire({
                title: t("Glossary deleted"),
                text: t("The glossary was successfully deleted."),
                icon: "success",
            });
            onDelete(glossary.id);
        } catch (error) {
            console.error("Error deleting glossary:", error);
            Swal.fire({
                title: t("Glossary deletion failed"),
                text: t("Try again later."),
                icon: "error",
            });
        }
    };

    const handleSave = async () => {
        try {
            const result = await editGlossary(glossary);
            if (!result) return;
            if (result.data.status === "success") {
                Swal.fire({
                    title: t("Glossary updated"),
                    text: t("The glossary was successfully updated."),
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: t("Glossary update failed"),
                    text: t("Try again later."),
                    icon: "error",
                });
            }
        } catch (error) {
            console.error("Error updating glossary:", error);
            Swal.fire({
                title: t("Glossary update failed"),
                text: t("Try again later."),
                icon: "error",
            });
        }
    };

    return (
        <tr>
            <td>
                <input
                    type="text"
                    value={glossary.title}
                    onChange={(e) => handleInputChange(e, "title")}
                />
            </td>
            <td>
                <input
                    type="text"
                    value={glossary.title_cs}
                    onChange={(e) => handleInputChange(e, "title_cs")}
                />
            </td>
            <td>
                <input
                    type="text"
                    value={glossary.answer}
                    onChange={(e) => handleInputChange(e, "answer")}
                />
            </td>
            <td>
                <input
                    type="text"
                    value={glossary.answer_cs}
                    onChange={(e) => handleInputChange(e, "answer_cs")}
                />
            </td>
            <td>
                <button className="btn btn-danger" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
            <td>
                <button className="btn btn-success" onClick={handleSave}>
                    {t("Save")}
                </button>
            </td>
        </tr>
    );
};
