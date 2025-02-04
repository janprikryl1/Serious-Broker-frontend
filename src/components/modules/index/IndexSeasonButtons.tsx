import {FC} from "react";
import {IndexSeason} from "../../../utils/enums/IndexSeasonEnum.ts";
import {SeasonButton} from "./SeasonButton.tsx";
import {useIndexDataContext} from "../../../utils/providers/IndexDataProvider.tsx";

export const IndexSeasonButtons:FC = () => {
    const { season, handleSelect } = useIndexDataContext();

    return (
        <div className="col-sm season-button-group" style={{maxWidth: 480}}>
            {Object.values(IndexSeason).map((seasonValue) => (
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