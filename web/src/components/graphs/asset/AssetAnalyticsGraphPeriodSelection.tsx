import {FC} from "react";
import {QuotedCurrenciesPeriod} from "../../../utils/options/QuotedCurrenciesPeriod.ts";
import {SeasonButton} from "../../overview/SeasonButton.tsx";
import {captureEvent} from "../../../utils/posthog.ts";

type Props = {
    season: QuotedCurrenciesPeriod;
    handleSelect: (season: QuotedCurrenciesPeriod) => void;
};

export const AssetAnalyticsGraphPeriodSelection:FC<Props> = ({season, handleSelect}) => {
    return (
        <div className="tw-w-full md:tw-w-auto">
            <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-1 sm:tw-gap-2 md:tw-justify-start">
                {Object.values(QuotedCurrenciesPeriod).map((seasonValue) => (
                    <SeasonButton
                        key={seasonValue}
                        seasonValue={seasonValue}
                        isActive={season === seasonValue}
                        onSelect={() => {
                            captureEvent('chart_period_changed', { period: seasonValue });
                            handleSelect(seasonValue as QuotedCurrenciesPeriod);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}