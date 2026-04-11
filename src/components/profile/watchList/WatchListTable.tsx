import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {WatchListType} from "../../../utils/types/watchList/WatchListType.ts";
import {renderTable} from "../../../utils/functions/renderTable.tsx";
import {IoWalletOutline} from "react-icons/io5";
import {BsFileText} from "react-icons/bs";
import {LuCoins} from "react-icons/lu";
import {getAllCryptocurrencies} from "../../../utils/api/adminCryptocurrencyService.ts";
import {CryptoCurrencyAdminType} from "../../../utils/types/asset/CryptoCurrencyType.ts";
import {getBinanceIndexAssetRecomBestPreviousDetail} from "../../../utils/api/GraphsService.ts";
import {
  BinanceIndexAssetRecomBestPreviousDetails
} from "../../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";

type Props = {
  watchList: WatchListType[];
  setWatchList: Dispatch<SetStateAction<WatchListType[] | undefined>>;
};

export const WatchListTable: FC<Props> = ({watchList, setWatchList}) => {
  const {t} = useTranslation();
  const [cryptocurrencies, setCryptocurrencies] = useState<CryptoCurrencyAdminType[]>([]);
  const [recommendationData, setRecommendationData] = useState<Map<string, BinanceIndexAssetRecomBestPreviousDetails>>(new Map());

  useEffect(() => {
    const loadData = async () => {
      try {
        // Načítaj kryptomeny
        const cryptoResponse = await getAllCryptocurrencies();
        if (cryptoResponse?.data) {
          setCryptocurrencies(cryptoResponse.data);
        }
      } catch (e) {
        console.error("Error loading cryptocurrencies:", e);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadCoinDetails = async () => {
      const coinsToLoad = watchList.filter((item) => item.type === "coin");

      if (coinsToLoad.length === 0) {
        setRecommendationData(new Map());
        return;
      }

      const dataMap = new Map<string, BinanceIndexAssetRecomBestPreviousDetails>();

      for (const coin of coinsToLoad) {
        try {
          const response = await getBinanceIndexAssetRecomBestPreviousDetail(coin.title || "");
          if (response?.data) {
            dataMap.set(coin.title || "", response.data);
          }
        } catch (e) {
          console.error(`Error loading data for coin ${coin.title}:`, e);
        }
      }

      setRecommendationData(dataMap);
    };

    loadCoinDetails();
  }, [watchList]);

  const assets = watchList.filter((item) => item.type === "asset");
  const coins = watchList.filter((item) => item.type === "coin");
  const articles = watchList.filter((item) => item.type === "article");

  return (
    <div className="row g-5">
      <div className="col-xl-6 col-lg-12">
        {renderTable(
          <div className="d-flex align-items-center gap-3">
            <div className="color-container--gold icon-container">
              <IoWalletOutline size={30}/>
            </div>
            <span>{t("Market Indices")}</span>
          </div>,
          assets,
          watchList,
          setWatchList,
          cryptocurrencies,
          recommendationData
        )}
        {renderTable(
          <div className="d-flex align-items-center gap-3">
            <div className="color-container--gold icon-container">
              <BsFileText size={28}/>
            </div>
            <span>{t("Articles")}</span>
          </div>,
          articles,
          watchList,
          setWatchList,
          cryptocurrencies,
          recommendationData
        )}
      </div>
      <div className="col-xl-6">
        {renderTable(
          <div className="d-flex align-items-center gap-3">
            <div className="color-container--gold icon-container">
              <LuCoins size={30}/>
            </div>
            <span>{t("Cryptocurrencies")}</span>
          </div>,
          coins,
          watchList,
          setWatchList,
          cryptocurrencies,
          recommendationData
        )}
      </div>
    </div>
  );
};
