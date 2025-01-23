import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState} from 'react';
import {IndexSeason} from "../enums/IndexSeasonEnum";
import {getIndexData} from "../../api/indexDataService";

type Props = {
    children: ReactNode;
};

type IndexDataContextType = {
    date: string;
    season: IndexSeason;
    setSeason: Dispatch<SetStateAction<IndexSeason>>;
    handleSelect: (selectedSeason: IndexSeason) => void;
};

const IndexDataContext = createContext<IndexDataContextType | undefined>(undefined);

export const IndexDataProvider: FC<Props> = ({ children }) => {
    const [season, setSeason] = useState<IndexSeason>(IndexSeason.WEEK);
    const [date, setDate] = useState("");

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

    const handleSelect = (selectedSeason: IndexSeason) => {
        setSeason(selectedSeason);
    };


    return (
        <IndexDataContext.Provider value={{ date, season, setSeason, handleSelect }}>
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
