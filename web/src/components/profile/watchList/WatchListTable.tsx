import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {useQueries} from "@tanstack/react-query";
import {useTranslation} from "react-i18next";
import {WatchListType} from "../../../utils/types/watchList/WatchListType.ts";
import {renderTable} from "../../../utils/functions/renderTable.tsx";
import {IoWalletOutline} from "react-icons/io5";
import {BsFileText} from "react-icons/bs";
import coinsGroupOutline from "../../../utils/icons/coins/coins_group_outline.svg";
import singleCoinOutline from "../../../utils/icons/coins/coins_single_outline.svg";
import {getAllCryptocurrencies} from "../../../utils/api/adminCryptocurrencyService.ts";
import {CryptoCurrencyAdminType} from "../../../utils/types/asset/CryptoCurrencyType.ts";
import {getBinanceIndexAssetRecomBestPreviousDetail} from "../../../utils/api/GraphsService.ts";
import {assetByNameQueryOptions} from "../../../utils/hooks/queries/useAssetByName.ts";
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

  // Indexy i coiny se načítají paralelně a sdílí cache s detailem indexu,
  // takže se při návratu na stránku nebo překreslení nestahují znovu.
  const assetTitles = watchList.filter((item) => item.type === "asset").map((item) => item.title || "");
  const coinTitles = watchList.filter((item) => item.type === "coin").map((item) => item.title || "");

  const assetQueries = useQueries({
    queries: assetTitles.map((title) => assetByNameQueryOptions(title)),
  });
  const coinQueries = useQueries({
    queries: coinTitles.map((title) => ({
      queryKey: ["recom-best-previous-detail", title],
      queryFn: async () => (await getBinanceIndexAssetRecomBestPreviousDetail(title))?.data ?? null,
    })),
  });

  const recommendationData = new Map<string, AssetDetailType | BinanceIndexAssetRecomBestPreviousDetails>();
  assetTitles.forEach((title, index) => {
    const data = assetQueries[index]?.data;
    if (data) recommendationData.set(title, data);
  });
  coinTitles.forEach((title, index) => {
    const data = coinQueries[index]?.data;
    if (data) recommendationData.set(title, data);
  });

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
