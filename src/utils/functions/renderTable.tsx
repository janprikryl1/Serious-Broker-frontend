import {WatchListType} from "../types/watchList/WatchListType.ts";
import {Link} from "react-router-dom";
import {WatchListEnum} from "../enums/WatchListEnum.ts";
import {routes} from "../constants";
import {Button} from "../../components/reusable/Button.tsx";
import {LuTrash} from "react-icons/lu";
import {useTranslation} from "react-i18next";
import {removeFromWatchList} from "../api/watchListService.ts";
import {Dispatch, SetStateAction} from "react";

export const renderTable = (title: string, items: WatchListType[], watchList: WatchListType[], setWatchList: Dispatch<SetStateAction<WatchListType[] | undefined>>) => {
    const {t} = useTranslation();

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
    
    if (items.length === 0) return null;

    return (
        <div className="watchlist-section">
            <h3>{title}</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>{t("Link")}</th>
                    <th>{t("Created")}</th>
                    <th>{t("Action")}</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td style={{width: "33%"}}><Link to={item.type === WatchListEnum.Asset ? `${routes.assetGraphURL}${item.title}` : item.type === WatchListEnum.Coin ? `${routes.assetGraphDetail}/${item.item_id}` : `${routes.articleURL}${item.item_id}`}>{item.title}</Link></td>
                        <td>{new Date(item.created).toLocaleDateString()}</td>
                        <td><Button onClick={() => handleRemoveFromWatchList(item)}><LuTrash /></Button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};