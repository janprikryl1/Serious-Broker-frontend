import { FC } from "react";
import { OverviewTableTitle } from "./OverviewTableTitle.tsx";
import {OverviewTables} from "./OverviewTables.tsx";
import {OverviewChartTypeButtons} from "../OverviewChartTypeButtons.tsx";
import {OverviewSeasonButtons} from "../OverviewSeasonButtons.tsx";
import {IndexDataProvider} from "../../../utils/providers/IndexDataProvider.tsx";

export const OverviewTableData: FC = () => {
    return (
        <div className="cta-dark">
            <OverviewTableTitle/>
            <IndexDataProvider>
                <>
                    <div className="row">
                        <OverviewChartTypeButtons/>
                        <OverviewSeasonButtons/>
                    </div>
                    <OverviewTables/>
                </>
            </IndexDataProvider>
        </div>
    );
};
