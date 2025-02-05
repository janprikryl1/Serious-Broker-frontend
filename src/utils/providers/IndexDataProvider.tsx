import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState} from 'react';
import {IndexSeason} from "../enums/IndexSeasonEnum";
import {getIndexData, getLatestCoinmarketcupCoins} from "../../api/indexDataService";
import {IndexChartsType} from "../enums/IndexChartsTypeEnum.ts";
import {MostProfitable} from "../types/indexPage/IndexDataStructure.ts";

type Props = {
    children: ReactNode;
};

type IndexDataContextType = {
    date: string;
    season: IndexSeason;
    setSeason: Dispatch<SetStateAction<IndexSeason>>;
    chartType: IndexChartsType;
    handleSelectChartType: (selectedChartType: IndexChartsType) => void;
    handleSelect: (selectedSeason: IndexSeason) => void;
    last_coinmarketcup_coins?: MostProfitable[];
};

const IndexDataContext = createContext<IndexDataContextType | undefined>(undefined);

export const IndexDataProvider: FC<Props> = ({ children }) => {
    const [season, setSeason] = useState<IndexSeason>(IndexSeason.WEEK);
    const [chartType, setChartType] = useState<IndexChartsType>(IndexChartsType.GAINS);
    const [date, setDate] = useState("");
    const [last_coinmarketcup_coins, setLastCoinmarketcupCoins] = useState<MostProfitable[]>();

    useEffect(() => {
        const fetchDate = async () => {
            try {
                const result = await getIndexData();
                setDate(result.data.date);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDate();
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getLatestCoinmarketcupCoins();
                setLastCoinmarketcupCoins(response.data);
            } catch (exception) {
                console.error(exception);
            }
        };
        getData();
    }, []);

    const handleSelect = (selectedSeason: IndexSeason) => {
        setSeason(selectedSeason);
    };
    
    const handleSelectChartType = (selectedChartType: IndexChartsType) => {
        setChartType(selectedChartType);
    };

    return (
        <IndexDataContext.Provider value={{ date, season, setSeason, handleSelect, chartType, handleSelectChartType, last_coinmarketcup_coins }}>
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
