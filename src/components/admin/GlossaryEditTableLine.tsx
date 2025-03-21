import {ChangeEvent, FC, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {GlossaryType} from "../../utils/types/GlossaryType.ts";
import {deleteGlossary, editGlossary} from "../../utils/api/glossaryService.ts";
import {glossaryImagesURL} from "../../utils/constants";
import {Button, ButtonColor} from "../reusable/Button.tsx";
import {CustomSwal} from "../../utils/functions/customSwal.ts";

type Props = {
    glossary: GlossaryType;
    onUpdate: (updatedGlossary: GlossaryType) => void;
    onDelete: (id: number) => void;
};

export const GlossaryEditTableLine: FC<Props> = ({ glossary, onUpdate, onDelete }) => {
    const { t } = useTranslation();
    const [localImage, setLocalImage] = useState<File | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: keyof GlossaryType) => {
        if (field === "image") {
            const file = e.target.files?.[0] || null;
            setLocalImage(file); // Update local state with the selected file
        } else {
            onUpdate({ ...glossary, [field]: e.target.value });
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
            console.error("Error deleting glossary:", error);
            CustomSwal.fire({
                title: t("Glossary deletion failed"),
                text: t("Try again later."),
                icon: "error",
            });
        }
    };

    const handleSave = async () => {
        try {
            const updatedGlossary = {
                ...glossary,
                image: localImage ? localImage.name : glossary.image,
            };

            const result = await editGlossary(updatedGlossary, localImage);
            if (!result) return;
            if (result.data.status === "success") {
                CustomSwal.fire({
                    title: t("Glossary updated"),
                    text: t("The glossary was successfully updated."),
                    icon: "success",
                });
            } else {
                CustomSwal.fire({
                    title: t("Glossary update failed"),
                    text: t("Try again later."),
                    icon: "error",
                });
            }
        } catch (error) {
            console.error("Error updating glossary:", error);
            CustomSwal.fire({
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
                <input
                    type="file"
                    onChange={(e) => handleInputChange(e, "image")}
                    accept="image/*"
                    className="form-control"
                />
                {glossary.image && !localImage && (
                    <Link to={`${glossaryImagesURL}${glossary.image}`}>{glossary.image}</Link>
                )}
                {localImage && (
                    <div style={{ marginTop: "10px" }}>{localImage.name}</div>
                )}
            </td>
            <td>
                <Button color={ButtonColor.red} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </td>
            <td>
                <Button onClick={handleSave}>
                    {t("Save")}
                </Button>
            </td>
        </tr>
    );
};
