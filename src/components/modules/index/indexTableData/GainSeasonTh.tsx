import {FC} from "react";
import {IndexSeasonExtended} from "../../../../utils/enums/IndexSeasonEnum.ts";
import {useTranslation} from "react-i18next";
import {useIndexDataContext} from "../../../../utils/providers/IndexDataProvider.tsx";

export const GainSeasonTh:FC = () => {
    const {t} = useTranslation();
    const {season} = useIndexDataContext();
    
    return (
        <th>{t(`${season === IndexSeasonExtended.WEEK ? "Week" : season === IndexSeasonExtended.MONTH ? "Month" : season === IndexSeasonExtended.QUARTER ? "Quarter" : season === IndexSeasonExtended.SMART ? "Smart" : "Year"} 0 profit: `)}</th>
    );
}