import {ChangeEvent, FC} from "react";
import {useTranslation} from "react-i18next";
import {useDemoContext} from "../../../utils/providers/DemoProvider.tsx";

export const DemoNameEdit:FC = () => {
    const {t} = useTranslation();
    const {demo, updateDemo} = useDemoContext();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateDemo({ name: e.target.value });
    };

    return (
        <div className="mb-3">
            <label htmlFor="demoName" className="form-label">
                {t("Demo Name")}
            </label>
            <input
                type="text"
                id="demoName"
                className="form-control"
                value={demo.name}
                onChange={handleChange}
            />
        </div>
    );
}