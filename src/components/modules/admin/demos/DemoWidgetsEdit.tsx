import { FC, useState } from "react";
import { useDemoContext } from "../../../../utils/providers/DemoProvider.tsx";
import { WidgetsType, widgets } from "../../../../utils/types/demos/demoType";
import { useTranslation } from "react-i18next";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { Form } from "react-bootstrap";
import {Button, ButtonColor} from "../../../Button.tsx";

export const DemoWidgetsEdit: FC = () => {
    const { t } = useTranslation();
    const { demo, updateDemo } = useDemoContext();
    const [newWidget, setNewWidget] = useState<widgets>({
        type: WidgetsType.Image,
        propertyId: "",
        visible: true
    });

    const handleWidgetChange = (index: number, updatedWidget: widgets) => {
        const updatedWidgets = [...demo.widgets];
        updatedWidgets[index] = updatedWidget;
        updateDemo({ widgets: updatedWidgets });
    };

    const handleAddWidget = () => {
        updateDemo({ widgets: [...demo.widgets, newWidget] });
        setNewWidget({ type: WidgetsType.Image, propertyId: "", visible: true });
    };

    const handleDeleteWidget = (index: number) => {
        const updatedWidgets = demo.widgets.filter((_, i) => i !== index);
        updateDemo({ widgets: updatedWidgets });
    };

    const handleMoveWidget = (index: number, direction: 'up' | 'down') => {
        const updatedWidgets = [...demo.widgets];
        if (direction === 'up' && index > 0) {
            [updatedWidgets[index], updatedWidgets[index - 1]] =
                [updatedWidgets[index - 1], updatedWidgets[index]];
        } else if (direction === 'down' && index < updatedWidgets.length - 1) {
            [updatedWidgets[index], updatedWidgets[index + 1]] =
                [updatedWidgets[index + 1], updatedWidgets[index]];
        }
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
                                    {t(type)}
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
                        <Button
                            color={ButtonColor.red}
                            className="btn btn-danger me-4"
                            onClick={() => handleDeleteWidget(index)}
                        >
                            {t("Delete")}
                        </Button>

                        <div className="d-flex align-items-center me-4">
                            <Button
                                className="me-2"
                                onClick={() => handleMoveWidget(index, 'up')}
                                disabled={index === 0}
                            >
                                <FaArrowCircleUp />
                            </Button>
                            <Button
                                onClick={() => handleMoveWidget(index, 'down')}
                                disabled={index === demo.widgets.length - 1}
                            >
                                <FaArrowCircleDown />
                            </Button>
                        </div>
                        <Form.Check
                            type="switch"
                            label={t("Visible")}
                            checked={widget.visible}
                            onChange={(e) =>
                                handleWidgetChange(index, {
                                    ...widget,
                                    visible: e.target.checked,
                                })
                            }
                        />
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
                            {t(type)}
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
                <Button onClick={handleAddWidget}>
                    {t("Add Widget")}
                </Button>
            </div>
        </div>
    );
};
