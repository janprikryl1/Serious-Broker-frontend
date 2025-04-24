import {FC} from "react";
import {widgets, WidgetsType} from "../../../utils/types/demos/demoType.ts";
import {Button, ButtonColor} from "../../reusable/Button.tsx";
import {FaArrowCircleDown, FaArrowCircleUp} from "react-icons/fa";
import {Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useDemoContext} from "../../../utils/providers/DemoProvider.tsx";

type Props = {
    index: number;
    widget: widgets;
}

export const DemoWidgetItemEdit:FC<Props> = ({index, widget}) => {
    const {t} = useTranslation();
    const { demo, updateDemo } = useDemoContext();

    const handleDeleteWidget = (index: number) => {
        const updatedWidgets = demo.widgets.filter((_, i) => i !== index);
        updateDemo({ widgets: updatedWidgets });
    };

    const handleWidgetChange = (index: number, updatedWidget: widgets) => {
        const updatedWidgets = [...demo.widgets];
        updatedWidgets[index] = updatedWidget;
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
        <div key={index} className="mb-3">
            <div className="d-flex align-items-center mb-2">
                <select
                    className="form-select me-2 demo-input-height"
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
                    className="form-control me-2 demo-input-height"
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
                        <FaArrowCircleUp/>
                    </Button>
                    <Button
                        onClick={() => handleMoveWidget(index, 'down')}
                        disabled={index === demo.widgets.length - 1}
                    >
                        <FaArrowCircleDown/>
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
    );
}