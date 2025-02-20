import {ChangeEvent, FC} from "react";
import {useTranslation} from "react-i18next";
import {useDemoContext} from "../../../utils/providers/DemoProvider.tsx";

export const DemoDescriptionEdit:FC = () => {
    const {t} = useTranslation();
    const {demo, updateDemo} = useDemoContext();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateDemo({ description: e.target.value });
    };
    
    return (
        <div className="mb-3">
            <label htmlFor="demoDescription" className="form-label">
                {t("Demo Description")}
            </label>
            <textarea
                id="demoDescription"
                className="form-control"
                rows={4}
                value={demo.description}
                onChange={handleChange}
            />
        </div>
    );
}