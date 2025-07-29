import { FC, useEffect, useState } from "react";
import {deleteFormSetting, getFormSettings, saveFormSettings} from "../../utils/api/formsService";
import { Button, ButtonColor } from "../../components/reusable/Button";
import { FaSave, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { EvaluationCategory } from "../../utils/types/admin/EvaluationCategory.ts";
import { FaRegTrashCan } from "react-icons/fa6";


export const FormEvaulationSettings: FC = () => {
    const [categories, setCategories] = useState<EvaluationCategory[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await getFormSettings();
                if (response?.data) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Error fetching evaluation settings:", error);
                toast.error("Nepodařilo se načíst data.");
            }
        })();
    }, []);

    const handleAddCategory = () => {
        setCategories(prev => [
            ...prev,
            { name: "", description: "", min_score: 0, max_score: 0 }
        ]);
    };

    const handleChange = (index: number, field: keyof EvaluationCategory, value: string | number) => {
        setCategories(prev => {
            const updated = [...prev];
            (updated[index] as any)[field] = field === "min_score" || field === "max_score" ? Number(value) : value;
            return updated;
        });
    };

    const handleDelete = async (index: number) => {
        const toDelete = categories[index];

        if (toDelete?.id) {
            try {
                await deleteFormSetting(toDelete.id);
            } catch (error) {
                console.error("Chyba při mazání:", error);
                return;
            }
        }
        setCategories(prev => prev.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            const response = await saveFormSettings(categories);
            if (response?.status === 200) {
                toast.success("Uloženo.");
            } else {
                toast.error("Chyba při ukládání.");
            }
        } catch (err) {
            console.error("Save error", err);
            toast.error("Chyba při ukládání.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="admin-container mt-4">
            <h4 className="mb-3">Vyhodnocení podle bodů</h4>
            {categories.map((cat, index) => (
                <div className="border rounded p-3 mb-3" key={index}>
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            style={{width: "200px"}}
                            value={cat.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            style={{width: "300px"}}
                            value={cat.description}
                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                        />
                        <input
                            type="number"
                            className="form-control form-control-lg"
                            style={{width: "100px"}}
                            value={cat.min_score}
                            onChange={(e) => handleChange(index, 'min_score', e.target.value)}
                        />
                        <input
                            type="number"
                            className="form-control form-control-lg" 
                            style={{width: "100px"}} 
                            value={cat.max_score}
                            onChange={(e) => handleChange(index, 'max_score', e.target.value)}
                        />
                        <button 
                            className="btn btn-danger d-flex align-items-center justify-content-center"
                            onClick={() => handleDelete(index)}
                            style={{height: "60px", width: "60px"}}
                        >
                            <FaRegTrashCan/>
                        </button>
                    </div>
                </div>
            ))}

            <div className="d-flex gap-2">
                <Button onClick={handleAddCategory} color={ButtonColor.gray}>
                    <FaPlus className="me-1"/>
                    Přidat záznam
                </Button>
                <Button onClick={handleSave} color={ButtonColor.green} disabled={isSaving}>
                    <FaSave className="me-1"/>
                    Uložit změny
                </Button>
            </div>
        </div>
    );
};
