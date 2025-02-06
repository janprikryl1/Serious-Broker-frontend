import { FC } from "react";
import { IndexTableTitle } from "./IndexTableTitle.tsx";
import {IndexTables} from "./IndexTables.tsx";
import {IndexChartTypeButtons} from "../IndexChartTypeButtons.tsx";
import {IndexSeasonButtons} from "../IndexSeasonButtons.tsx";

export const IndexTableData: FC = () => {
    return (
        <div className="cta-dark">
            <IndexTableTitle/>
            <div className="row">
                <IndexChartTypeButtons/>
                <IndexSeasonButtons/>
            </div>
            <IndexTables/>
        </div>
    );
};
