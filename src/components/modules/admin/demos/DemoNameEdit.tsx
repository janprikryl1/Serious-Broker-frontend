import {ChangeEvent, FC} from "react";
import {useDemoContext} from "../../../../utils/providers/DemoProvider.tsx";

export const DemoNameEdit:FC = () => {
    const {demo, updateDemo} = useDemoContext();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateDemo({ name: e.target.value });
    };

    return (
        <div className="mb-3">
            <label htmlFor="demoName" className="form-label">
                Demo Name
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