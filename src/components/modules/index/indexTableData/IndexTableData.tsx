import { FC } from "react";
import { IndexTableTitle } from "./IndexTableTitle.tsx";
import {IndexTables} from "./IndexTables.tsx";
import {IndexChartTypeButtons} from "../IndexChartTypeButtons.tsx";
import {IndexSeasonButtons} from "../IndexSeasonButtons.tsx";
import {IndexDataProvider} from "../../../../utils/providers/IndexDataProvider.tsx";

export const IndexTableData: FC = () => {
    return (
        <div className="cta-dark">
            <IndexTableTitle/>
            <IndexDataProvider>
                <>
                    <div className="row">
                        <IndexChartTypeButtons/>
                        <IndexSeasonButtons/>
                    </div>
                    <IndexTables/>
                </>
            </IndexDataProvider>
        </div>
    );
};
