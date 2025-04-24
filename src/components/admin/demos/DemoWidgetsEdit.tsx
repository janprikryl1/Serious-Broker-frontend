import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {useDemoContext} from "../../../utils/providers/DemoProvider.tsx";
import {widgets, WidgetsType} from "../../../utils/types/demos/demoType.ts";
import {Button} from "../../reusable/Button.tsx";
import {DemoWidgetItemEdit} from "./DemoWidgetItemEdit.tsx";
import "../../../styles/sass/components/demo.scss";
import {defaultDemo} from "../../../utils/constants/defaultContent.ts";

export const DemoWidgetsEdit: FC = () => {
    const { t } = useTranslation();
    const { demo, updateDemo } = useDemoContext();
    const [newWidget, setNewWidget] = useState<widgets>(defaultDemo);

    const handleAddWidget = () => {
        updateDemo({ widgets: [...demo.widgets, newWidget] });
        setNewWidget({ type: WidgetsType.Image, propertyId: "", visible: true });
    };

    return (
        <div>
            <h3>{t("Edit Widgets")}</h3>
            {demo.widgets.map((widget, index) => (
                <DemoWidgetItemEdit widget={widget} index={index} key={index} />
            ))}
            <h4>{t("Add New Widget")}</h4>
            <div className="d-flex align-items-center mb-3">
                <select
                    className="form-select me-2 demo-input-height"
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
                    className="form-control me-2 demo-input-height"
                    value={newWidget.propertyId}
                    onChange={(e) =>
                        setNewWidget({ ...newWidget, propertyId: e.target.value })
                    }
                />
                <Button onClick={handleAddWidget} className="demo-input-height">
                    {t("Add Widget")}
                </Button>
            </div>
        </div>
    );
};
