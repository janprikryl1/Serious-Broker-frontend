import {ChangeEvent, FC} from "react";
import {useTranslation} from "react-i18next";
import {useDemoContext} from "../../../utils/providers/DemoProvider.tsx";

export const DemoWidgetTimeToggle:FC = () => {
    const {t} = useTranslation();
    const {demo, updateDemo} = useDemoContext();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateDemo({ time_of_replace: Number(e.target.value) });
    };
    
    return (
        <div className="mb-3">
            <label htmlFor="demoName" className="form-label">
                {t("Time to toggle")}
            </label>
            <input
                type="number"
                id="demoName"
                className="form-control"
                value={demo.time_of_replace}
                onChange={handleChange}
            />
        </div>
    );
};