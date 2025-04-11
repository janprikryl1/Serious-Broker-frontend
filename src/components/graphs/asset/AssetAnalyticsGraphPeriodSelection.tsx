import {FC} from "react";
import {QuotedCurrenciesPeriod} from "../../../utils/options/QuotedCurrenciesPeriod.ts";
import {SeasonButton} from "../../overview/SeasonButton.tsx";

type Props = {
    season: QuotedCurrenciesPeriod;
    handleSelect: (season: QuotedCurrenciesPeriod) => void;
};

export const AssetAnalyticsGraphPeriodSelection:FC<Props> = ({season, handleSelect}) => {
    return (
        <div className="col-sm-5">
            <div className="season-button-group">
                {Object.values(QuotedCurrenciesPeriod).map((seasonValue) => (
                    <SeasonButton
                        key={seasonValue}
                        seasonValue={seasonValue}
                        isActive={season === seasonValue}
                        onSelect={() => handleSelect(seasonValue as QuotedCurrenciesPeriod)}
                    />
                ))}
            </div>
        </div>
    );
}