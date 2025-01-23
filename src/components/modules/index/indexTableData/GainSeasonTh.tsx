import {FC} from "react";
import {IndexSeason} from "../../../../utils/enums/IndexSeasonEnum.ts";
import {useTranslation} from "react-i18next";
import {useIndexDataContext} from "../../../../utils/providers/IndexDataProvider.tsx";

export const GainSeasonTh:FC = () => {
    const {t} = useTranslation();
    const {season} = useIndexDataContext();
    
    return (
        <th>{t(`${season === IndexSeason.WEEK ? "Week" : season === IndexSeason.MONTH ? "Month" : season === IndexSeason.QUARTER ? "Quarter" : season === IndexSeason.SMART ? "Smart" : "Year"} 0 profit: `)}</th>
    );
}