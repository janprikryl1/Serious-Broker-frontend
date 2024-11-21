import { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import { IndexDataStructure } from "../types/indexPage/IndexDataStructure";
import { IndexSeason } from "../enums/IndexSeasonEnum";
import { getIndexData } from "../../api/indexDataService";

type Props = {
    children: ReactNode;
};

type IndexDataContextType = {
    data: IndexDataStructure;
    season: IndexSeason;
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
        setSeason(selectedSeason);
    };

    if (!data) {
        return <p>Loading skeleton...</p>;
    }

    return (
        <IndexDataContext.Provider value={{ data, season, handleSelect }}>
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
