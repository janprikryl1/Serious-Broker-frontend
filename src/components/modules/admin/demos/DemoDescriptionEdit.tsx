import {ChangeEvent, FC} from "react";
import {useDemoContext} from "../../../../utils/providers/DemoProvider.tsx";

export const DemoDescriptionEdit:FC = () => {
    const {demo, updateDemo} = useDemoContext();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateDemo({ description: e.target.value });
    };
    
    return (
        <div className="mb-3">
            <label htmlFor="demoDescription" className="form-label">
                Demo Description
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