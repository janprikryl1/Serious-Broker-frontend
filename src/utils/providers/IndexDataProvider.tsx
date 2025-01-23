import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState} from 'react';
import {IndexDataStructure} from "../types/indexPage/IndexDataStructure";
import {IndexSeason} from "../enums/IndexSeasonEnum";
import {getIndexData} from "../../api/indexDataService";
import {IndexTableSkeleton} from "../../components/modules/index/indexTableData/IndexTableSkeleton.tsx";

type Props = {
    children: ReactNode;
};

type IndexDataContextType = {
    data: IndexDataStructure;
    season: IndexSeason;
    setSeason: Dispatch<SetStateAction<IndexSeason>>;
    handleSelect: (selectedSeason: IndexSeason) => void;
};

const IndexDataContext = createContext<IndexDataContextType | undefined>(undefined);

export const IndexDataProvider: FC<Props> = ({ children }) => {
    const [data, setData] = useState<IndexDataStructure>();
    const [season, setSeason] = useState<IndexSeason>(IndexSeason.WEEK);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getIndexData();
                setData(result.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleSelect = (selectedSeason: IndexSeason) => {
        if (selectedSeason === IndexSeason.SMART && data) {
            const seasonProfits: Record<IndexSeason.WEEK | IndexSeason.MONTH | IndexSeason.QUARTER | IndexSeason.YEAR, number> = {
                [IndexSeason.WEEK]: 0,
                [IndexSeason.MONTH]: 0,
                [IndexSeason.QUARTER]: 0,
                [IndexSeason.YEAR]: 0,
            };

            // Calculate cumulative profits for each season
            data.last_most_profitable.forEach((coin) => {
                seasonProfits[IndexSeason.WEEK] +=
                    (coin.week_0_profit ?? 0) + (coin.week_1_profit ?? 0) + (coin.week_2_profit ?? 0);
                seasonProfits[IndexSeason.MONTH] +=
                    (coin.month_0_profit ?? 0) + (coin.month_1_profit ?? 0) + (coin.month_2_profit ?? 0);
                seasonProfits[IndexSeason.QUARTER] +=
                    (coin.quarter_0_profit ?? 0) + (coin.quarter_1_profit ?? 0) + (coin.quarter_2_profit ?? 0);
                seasonProfits[IndexSeason.YEAR] +=
                    (coin.year_0_profit ?? 0) + (coin.year_1_profit ?? 0) + (coin.year_2_profit ?? 0);
            });

            // Determine the season with the highest profit
            const bestSeason = (Object.keys(seasonProfits) as Array<keyof typeof seasonProfits>).reduce(
                (maxSeason, season) => {
                    return seasonProfits[season] > seasonProfits[maxSeason] ? season : maxSeason;
                },
                IndexSeason.WEEK
            );

            setSeason(bestSeason);
        } else {
            setSeason(selectedSeason);
        }
    };

    if (!data) {
        return <IndexTableSkeleton />;
    }

    return (
        <IndexDataContext.Provider value={{ data, season, setSeason, handleSelect }}>
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
