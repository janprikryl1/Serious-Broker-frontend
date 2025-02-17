import {FC, useEffect, useState} from "react";
import {WatchListType} from "../../utils/types/watchList/WatchListType.ts";
import {WatchListTable} from "../../components/modules/profile/watchList/WatchListTable.tsx";
import {WatchListSkeleton} from "../../components/modules/profile/watchList/WatchListSkeleton.tsx";
import {NoItemsInWatchList} from "../../components/modules/profile/watchList/NoItemsInWatchList.tsx";
import {getMyWatchList} from "../../api/watchListService.ts";
import {useTranslation} from "react-i18next";

export const MyWatchList:FC = () => {
    const {t} = useTranslation();
    const [watchList, setWatchList] = useState<WatchListType[]>();

    useEffect(() => {
        const fetchWatchList = async () => {
            try {
                const response = await getMyWatchList();
                if (!response) return;
                setWatchList(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchWatchList();
    }, []);
    
    return (
        <div className="padding-bottom service-details__item">
            <div className="service-details__item-inner">
                <div
                    className="service-details__content"
                    data-aos="fade-up"
                    data-aos-duration="900"
                >
                    <h2 className="index-title">{t("My watch list")}</h2>
                    {watchList === undefined ? <WatchListSkeleton /> :
                     watchList.length === 0 ? <NoItemsInWatchList /> :
                     <WatchListTable watchList={watchList}/>
                    }
                </div>
            </div>
        </div>
    );
};