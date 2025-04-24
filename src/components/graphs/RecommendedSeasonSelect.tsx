import {Dispatch, FC, SetStateAction} from "react";
import {SeasonButton} from "../overview/SeasonButton.tsx";
import {RecommendationDetailSeasonEnum} from "../../utils/enums/RecommendationDetailSeasonEnum.ts";

type Props = {
    selectedPeriod: RecommendationDetailSeasonEnum;
    setSelectedPeriod: Dispatch<SetStateAction<RecommendationDetailSeasonEnum>>;
}

export const RecommendedSeasonSelect:FC<Props> = ({selectedPeriod, setSelectedPeriod}) => {
    return (
        <div className="col-sm season-button-group d-flex gap-3 mb-25" style={{maxWidth: 400}}>
            <SeasonButton
                seasonValue="Week"
                isActive={"Week" === selectedPeriod}
                onSelect={() => setSelectedPeriod(RecommendationDetailSeasonEnum.Week)}
            />
            <SeasonButton
                seasonValue="Month"
                isActive={"Month" === selectedPeriod}
                onSelect={() => setSelectedPeriod(RecommendationDetailSeasonEnum.Month)}
            />
            <SeasonButton
                seasonValue="Quarter"
                isActive={"Quarter" === selectedPeriod}
                onSelect={() => setSelectedPeriod(RecommendationDetailSeasonEnum.Quarter)}
            />
            <SeasonButton
                seasonValue="Year"
                isActive={"Year" === selectedPeriod}
                onSelect={() => setSelectedPeriod(RecommendationDetailSeasonEnum.Year)}
            />
        </div>
    )
}