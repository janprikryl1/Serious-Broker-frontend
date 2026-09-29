import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {WatchListType} from "../../../utils/types/watchList/WatchListType.ts";
import {renderTable} from "../../../utils/functions/renderTable.tsx";
import {IoWalletOutline} from "react-icons/io5";
import {BsFileText} from "react-icons/bs";
import coinsGroupOutline from "../../../utils/icons/coins/coins_group_outline.svg";
import singleCoinOutline from "../../../utils/icons/coins/coins_single-outline.svg";
import {getAllCryptocurrencies} from "../../../utils/api/adminCryptocurrencyService.ts";
import {CryptoCurrencyAdminType} from "../../../utils/types/asset/CryptoCurrencyType.ts";
import {getBinanceIndexAssetRecomBestPreviousDetail} from "../../../utils/api/GraphsService.ts";
import {getAssetByIndexLabel} from "../../../utils/api/binanceIndexAssets.ts";
import {AssetDetailType} from "../../../utils/types/asset/AssetDetailType.ts";
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
  const [recommendationData, setRecommendationData] = useState<Map<string, AssetDetailType | BinanceIndexAssetRecomBestPreviousDetails>>(new Map());

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
    const loadRecommendationDetails = async () => {
      const itemsToLoad = watchList.filter((item) => item.type === "coin" || item.type === "asset");

      if (itemsToLoad.length === 0) {
        setRecommendationData(new Map());
        return;
      }

      const dataMap = new Map<string, AssetDetailType | BinanceIndexAssetRecomBestPreviousDetails>();

      for (const item of itemsToLoad) {
        try {
          let response;

          if (item.type === "asset") {
            response = await getAssetByIndexLabel(item.title || "");
          } else {
            response = await getBinanceIndexAssetRecomBestPreviousDetail(item.title || "");
          }

          if (response?.data) {
            dataMap.set(item.title || "", response.data);
          }
        } catch (e) {
          console.error(`Error loading recommendation data for ${item.title}:`, e);
        }
      }

      setRecommendationData(dataMap);
    };

    loadRecommendationDetails();
  }, [watchList]);

  const assets = watchList.filter((item) => item.type === "asset");
  const coins = watchList.filter((item) => item.type === "coin");
  const articles = watchList.filter((item) => item.type === "article");

  return (
    <div className="row g-4 tw-w-full tw-max-w-full tw-overflow-x-hidden">
      <div className="col-12 col-xl-6 order-1 order-xl-1 tw-min-w-0">
        {renderTable(
          <div className="d-flex align-items-center gap-3">
            <div className="color-container--gold icon-container">
              <img src={coinsGroupOutline} alt="Cryptocurrencies" className="tw-h-[25px] tw-w-[25px] tw-object-contain" />
            </div>
            <span>{t("Indices")}</span>
          </div>,
          assets,
          watchList,
          setWatchList,
          cryptocurrencies,
          recommendationData
        )}
      </div>

      <div className="col-12 col-xl-6 order-2 order-xl-2 tw-min-w-0">
        {renderTable(
          <div className="d-flex align-items-center gap-3">
            <div className="color-container--gold icon-container">
              <img src={singleCoinOutline} alt="Cryptocurrencies" className="tw-h-[25px] tw-w-[25px] tw-object-contain" />
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

      <div className="col-12 col-xl-6 order-3 order-xl-3 tw-min-w-0">
        {renderTable(
          <div className="d-flex align-items-center gap-3">
            <div className="color-container--gold icon-container">
              <BsFileText size={18}/>
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
    </div>
  );
};
