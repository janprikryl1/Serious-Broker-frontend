import {FC, useEffect, useState} from "react";
import {WatchListType} from "../../utils/types/watchList/WatchListType.ts";
import {useTranslation} from "react-i18next";
import {getMyWatchList} from "../../utils/api/watchListService.ts";
import {WatchListSkeleton} from "../../components/profile/watchList/WatchListSkeleton.tsx";
import {NoItemsInWatchList} from "../../components/profile/watchList/NoItemsInWatchList.tsx";
import {WatchListTable} from "../../components/profile/watchList/WatchListTable.tsx";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";

export const MyWatchList: FC = () => {
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
    <>
      <TitleHeader title={t("Watchlist")}/>
      <div className="container">
        <div
          className="service-details__content"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          {watchList === undefined ? <WatchListSkeleton/> :
            watchList.length === 0 ? <NoItemsInWatchList/> :
              <WatchListTable watchList={watchList} setWatchList={setWatchList}/>
          }
        </div>
      </div>
    </>
  );
};