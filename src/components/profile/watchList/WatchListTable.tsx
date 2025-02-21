import {Dispatch, FC, SetStateAction} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {LuTrash} from "react-icons/lu";
import {WatchListType} from "../../../utils/types/watchList/WatchListType.ts";
import {removeFromWatchList} from "../../../utils/api/watchListService.ts";
import {WatchListEnum} from "../../../utils/enums/WatchListEnum.ts";
import {Button} from "../../reusable/Button.tsx";
import {routes} from "../../../utils/constants";

type Props = {
    watchList: WatchListType[];
    setWatchList: Dispatch<SetStateAction<WatchListType[] | undefined>>;
};

export const WatchListTable: FC<Props> = ({ watchList, setWatchList }) => {
    const {t} = useTranslation();
    const assets = watchList.filter((item) => item.type === "asset");
    const coins = watchList.filter((item) => item.type === "coin");
    const articles = watchList.filter((item) => item.type === "article");
    
    const handleRemoveFromWatchList = async (watchListItem: WatchListType) => {
        try {
            const response = await removeFromWatchList(watchListItem.item_id);
            if (response?.status === 200 && watchList) {
                setWatchList(watchList.filter((item) => item.id !== watchListItem.id));
            }
        } catch (e) {
            console.error(e);
        }
    }

    const renderTable = (title: string, items: WatchListType[]) => {
        if (items.length === 0) return null;

        return (
            <div className="watchlist-section">
                <h3>{title}</h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th>{t("Link")}</th>
                        <th>{t("Date of creation")}</th>
                        <th>{t("Action")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td><Link to={item.type === WatchListEnum.Asset ? `${routes.assetGraphURL}${item.title}` : item.type === WatchListEnum.Coin ? `${routes.assetGraphDetail}/${item.item_id}` : `${routes.articleURL}${item.item_id}`}>{item.title}</Link></td>
                            <td>{new Date(item.created).toLocaleDateString()}</td>
                            <td><Button onClick={() => handleRemoveFromWatchList(item)}><LuTrash /></Button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <>
            {renderTable(`📈 ${t("Assets")}`, assets)}
            {renderTable(`🪙 ${t("Coins")}`, coins)}
            {renderTable(`📰 ${t("Articles")}`, articles)}
        </>
    );
};
