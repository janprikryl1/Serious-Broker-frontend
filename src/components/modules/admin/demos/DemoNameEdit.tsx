import {ChangeEvent, FC} from "react";
import {useDemoContext} from "../../../../utils/providers/DemoProvider.tsx";
import {useTranslation} from "react-i18next";

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