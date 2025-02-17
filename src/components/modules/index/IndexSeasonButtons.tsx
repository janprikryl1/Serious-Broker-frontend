import {FC} from "react";
import {IndexSeason, IndexSeasonExtended} from "../../../utils/enums/IndexSeasonEnum.ts";
import {SeasonButton} from "./SeasonButton.tsx";
import {useIndexDataContext} from "../../../utils/providers/IndexDataProvider.tsx";
import {useMediaQuery} from "@mui/material";

export const IndexSeasonButtons:FC = () => {
    const { season, handleSelect } = useIndexDataContext();
    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <div className="col-sm season-button-group season-gains">
            {Object.values(isMobile ? IndexSeason : IndexSeasonExtended).map((seasonValue) => (
                <SeasonButton
                    key={seasonValue}
                    seasonValue={seasonValue}
                    isActive={season === seasonValue}
                    onSelect={() => handleSelect(seasonValue)}
                />
            ))}
        </div>
    );
}