import { FC, useState } from "react";
import { useDemoContext } from "../../../../utils/providers/DemoProvider.tsx";
import { WidgetsType, widgets } from "../../../../utils/types/demos/demoType";
import {useTranslation} from "react-i18next";

export const DemoWidgetsEdit: FC = () => {
    const {t} = useTranslation();
    const { demo, updateDemo } = useDemoContext();
    const [newWidget, setNewWidget] = useState<widgets>({
        type: WidgetsType.Image,
        propertyId: "",
    });

    const handleWidgetChange = (index: number, updatedWidget: widgets) => {
        const updatedWidgets = [...demo.widgets];
        updatedWidgets[index] = updatedWidget;
        updateDemo({ widgets: updatedWidgets });
    };

    const handleAddWidget = () => {
        if (!newWidget.propertyId.trim()) {
            alert("Property ID cannot be empty!");
            return;
        }
        updateDemo({ widgets: [...demo.widgets, newWidget] });
        setNewWidget({ type: WidgetsType.Image, propertyId: "" });
    };

    const handleDeleteWidget = (index: number) => {
        const updatedWidgets = demo.widgets.filter((_, i) => i !== index);
        updateDemo({ widgets: updatedWidgets });
    };

    return (
        <div>
            <h3>{t("Edit Widgets")}</h3>
            {demo.widgets.map((widget, index) => (
                <div key={index} className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                        <select
                            className="form-select me-2"
                            value={widget.type}
                            onChange={(e) =>
                                handleWidgetChange(index, {
                                    ...widget,
                                    type: e.target.value as WidgetsType,
                                })
                            }
                        >
                            {Object.values(WidgetsType).map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            className="form-control me-2"
                            value={widget.propertyId}
                            onChange={(e) =>
                                handleWidgetChange(index, {
                                    ...widget,
                                    propertyId: e.target.value,
                                })
                            }
                        />
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteWidget(index)}
                        >
                            {t("Delete")}
                        </button>
                    </div>
                </div>
            ))}
            <h4>{t("Add New Widget")}</h4>
            <div className="d-flex align-items-center mb-3">
                <select
                    className="form-select me-2"
                    value={newWidget.type}
                    onChange={(e) =>
                        setNewWidget({
                            ...newWidget,
                            type: e.target.value as WidgetsType,
                        })
                    }
                >
                    {Object.values(WidgetsType).map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    className="form-control me-2"
                    value={newWidget.propertyId}
                    onChange={(e) =>
                        setNewWidget({ ...newWidget, propertyId: e.target.value })
                    }
                />
                <button className="btn btn-primary" onClick={handleAddWidget}>
                    {t("Add Widget")}
                </button>
            </div>
        </div>
    );
};
