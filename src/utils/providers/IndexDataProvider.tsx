import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState} from 'react';
import {IndexSeason} from "../enums/IndexSeasonEnum";
import {IndexChartsType} from "../enums/IndexChartsTypeEnum.ts";

type Props = {
    children: ReactNode;
};

type IndexDataContextType = {
    season: IndexSeason;
    setSeason: Dispatch<SetStateAction<IndexSeason>>;
    chartType: IndexChartsType;
    handleSelectChartType: (selectedChartType: IndexChartsType) => void;
    handleSelect: (selectedSeason: IndexSeason) => void;
};

const IndexDataContext = createContext<IndexDataContextType | undefined>(undefined);

export const IndexDataProvider: FC<Props> = ({ children }) => {
    const [season, setSeason] = useState<IndexSeason>(IndexSeason.WEEK);
    const [chartType, setChartType] = useState<IndexChartsType>(IndexChartsType.GAINS);

    const handleSelect = (selectedSeason: IndexSeason) => {
        setSeason(selectedSeason);
    };
    
    const handleSelectChartType = (selectedChartType: IndexChartsType) => {
        setChartType(selectedChartType);
    };

    return (
        <IndexDataContext.Provider value={{ season, setSeason, handleSelect, chartType, handleSelectChartType }}>
            {children}
        </IndexDataContext.Provider>
    );
};

export const useIndexDataContext = () => {
    const context = useContext(IndexDataContext);
    if (!context) {
        throw new Error('useIndexDataContext must be used within an IndexDataProvider');
    }
    return context;
};
