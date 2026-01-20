import {CSSProperties, Dispatch, FC, SetStateAction} from "react";
import {SeasonButton} from "../overview/SeasonButton.tsx";
import {RecommendationDetailSeasonEnum} from "../../utils/enums/RecommendationDetailSeasonEnum.ts";

type Props = {
    selectedPeriod: RecommendationDetailSeasonEnum;
    setSelectedPeriod: Dispatch<SetStateAction<RecommendationDetailSeasonEnum>>;
    style?: CSSProperties;
    disabled?: boolean;
}

export const RecommendedSeasonSelect:FC<Props> = ({selectedPeriod, setSelectedPeriod, style, disabled = false}) => {
    return (
        <div
            className={`col-sm d-flex gap-3 mb-25 ${
                disabled ? "season-button-group-disabled" : "season-button-group"
            }`}
            style={{ maxWidth: 400, ...style }}
        >
            <SeasonButton
                seasonValue="Week"
                isActive={"Week" === selectedPeriod}
                onSelect={() => setSelectedPeriod(RecommendationDetailSeasonEnum.Week)}
                disabled={disabled}
            />
            <SeasonButton
                seasonValue="Month"
                isActive={"Month" === selectedPeriod}
                onSelect={() => setSelectedPeriod(RecommendationDetailSeasonEnum.Month)}
                disabled={disabled}
            />
            <SeasonButton
                seasonValue="Three Months"
                isActive={"Quarter" === selectedPeriod}
                onSelect={() => setSelectedPeriod(RecommendationDetailSeasonEnum.Quarter)}
                disabled={disabled}
            />
            <SeasonButton
                seasonValue="Year"
                isActive={"Year" === selectedPeriod}
                onSelect={() => setSelectedPeriod(RecommendationDetailSeasonEnum.Year)}
                disabled={disabled}
            />
        </div>
    )
}