import {FC} from "react";
import {SeasonButton} from "./SeasonButton.tsx";
import {useIndexDataContext} from "../../utils/providers/IndexDataProvider.tsx";
import {IndexChartsType} from "../../utils/enums/IndexChartsTypeEnum.ts";

export const IndexChartTypeButtons:FC = () => {
    const { chartType, handleSelectChartType } = useIndexDataContext();

    return (
        <div className="col-sm season-button-group chart-type mb-3" style={{minWidth:100}}>
            {Object.values(IndexChartsType).map((chartTypeItem) => (
                <SeasonButton
                    key={chartTypeItem}
                    seasonValue={chartTypeItem}
                    isActive={chartType === chartTypeItem}
                    onSelect={() => handleSelectChartType(chartTypeItem)}
                />
            ))}
        </div>
    );
}