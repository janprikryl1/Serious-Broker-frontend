import {Dispatch, FC, SetStateAction} from "react";
import {useTranslation} from "react-i18next";
import {WatchListType} from "../../../utils/types/watchList/WatchListType.ts";
import {renderTable} from "../../../utils/functions/renderTable.tsx";

type Props = {
    watchList: WatchListType[];
    setWatchList: Dispatch<SetStateAction<WatchListType[] | undefined>>;
};

export const WatchListTable: FC<Props> = ({ watchList, setWatchList }) => {
    const {t} = useTranslation();
    const assets = watchList.filter((item) => item.type === "asset");
    const coins = watchList.filter((item) => item.type === "coin");
    const articles = watchList.filter((item) => item.type === "article");
    
    return (
        <>
            {renderTable(`📈 ${t("Assets")}`, assets, watchList, setWatchList)}
            {renderTable(`🪙 ${t("Coins")}`, coins, watchList, setWatchList)}
            {renderTable(`📰 ${t("Articles")}`, articles, watchList, setWatchList)}
        </>
    );
};
