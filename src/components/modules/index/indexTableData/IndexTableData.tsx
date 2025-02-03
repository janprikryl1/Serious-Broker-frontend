import { FC } from "react";
import { IndexTableTitle } from "./IndexTableTitle.tsx";
import {IndexTables} from "./IndexTables.tsx";

export const IndexTableData: FC = () => {
    return (
        
            <div
                className="text-center d-flex flex-column align-items-center justify-content-center"
                style={{ marginTop: "250px" }}
            >
                <IndexTableTitle />
                <IndexTables />
            </div>
    );
};
