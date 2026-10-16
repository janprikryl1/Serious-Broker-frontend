import {FC, useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {
  BinanceIndexAssetRecomBestPreviousDetails
} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {useTranslation} from "react-i18next";
import {getBinanceIndexAssetRecomBestPreviousDetail} from "../../utils/api/GraphsService.ts";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {RecommendationDetailsSkeleton} from "../../components/graphs/RecommendationDetailsSkeleton.tsx";
import {RecommendationDetailSeasonEnum} from "../../utils/enums/RecommendationDetailSeasonEnum.ts";
import {getCryptocurrencyById} from "../../utils/api/CryptocurrencyService.ts";
import {coinURL, routes} from "../../utils/constants";
import {CryptoCurrencyDetailType} from "../../utils/types/asset/CryptoCurrencyType.ts";
import {IoIosArrowBack} from "react-icons/io";
import {CryptoDetailsTab1} from "../../components/tabs/CryptoDetailsTab1.tsx";
import {CryptoDetailsTab2} from "../../components/tabs/CryptoDetailsTab2.tsx";
import {StyledTab, StyledTabs} from "../../components/tabs/StyledTabs.tsx";
import Box from "@mui/material/Box";
import {KlineData} from "../../utils/types/asset/KlineData.ts";
import {getAllHourlyBinanceKlinesData} from "../../utils/api/binanceAPIService.ts";
import {CryptoDetailsTab3} from "../../components/tabs/CryptoDetailsTab3.tsx";
import {WatchlistButton} from "../../components/reusable/WatchlistButton.tsx";
import {WatchListEnum} from "../../utils/enums/WatchListEnum.ts";
import {addToWatchList, removeFromWatchList} from "../../utils/api/watchListService.ts";
import FallbackCoin from "../../utils/icons/coins/base_gold.png";
import {captureEvent} from "../../utils/posthog.ts";

export enum Day {
  Sunday = 1,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export const CryptocurrencyDetails: FC = () => {
  const {t, i18n} = useTranslation();
  const location = useLocation();
  const {asset_label} = useParams<{ asset_label: string }>();
  const [assetName, setAssetName] = useState<string>("");
  const [detailsData, setDetailsData] = useState<BinanceIndexAssetRecomBestPreviousDetails | undefined>();
  const [cryptoDetails, setCryptoDetails] = useState<CryptoCurrencyDetailType | undefined>();
  const [selectedPeriod, setSelectedPeriod] = useState<RecommendationDetailSeasonEnum>(RecommendationDetailSeasonEnum.Week);
  const [selectedDropdown, setSelectedDropdown] = useState<string>("buy");
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>("UTC");
  const [value, setValue] = useState('recommendation');
  const [klinesData, setKlinesData] = useState<KlineData[]>([]);
  const [isKlinesLoading, setIsKlinesLoading] = useState<boolean>(false);
  const [isInWatchList, setIsInWatchList] = useState<boolean>(
    location.state?.isInWatchlist ?? false
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    captureEvent('crypto_details_tab_changed', {
      asset_label,
      tab: newValue,
    });
  };

  const formatMarketCap = (num: number, language: string) => {
    const locale = language.startsWith("cs") || language.startsWith("sk") ? "cs-CZ" : "en-US";

    return new Intl.NumberFormat(locale, {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
    }).format(num);
  };

  const handleToggleWatchList = async () => {
    const coinId = location.state?.assetId || cryptoDetails?.id;

    if (!coinId) {
      console.error(`ID kryptomeny nebolo nájdené pre ${asset_label}`);
      return;
    }

    const previousState = isInWatchList;
    const nextState = !previousState;

    setIsInWatchList(nextState);

    try {
      if (previousState) {
        const response = await removeFromWatchList(coinId);
        if (response?.status !== 200) {
          throw new Error("Failed to remove from watchlist");
        }
      } else {
        const response = await addToWatchList(coinId, WatchListEnum.Coin);
        if (response?.status !== 200) {
          throw new Error("Failed to add to watchlist");
        }
      }
    } catch (e) {
      console.error("Error toggling watchlist:", e);
      setIsInWatchList(previousState);
    }
  };

  useEffect(() => {
    if (!asset_label) return;
    const getData = async () => {
      try {
        const res = await getBinanceIndexAssetRecomBestPreviousDetail(asset_label);
        setDetailsData(res.data);

        const cryptoRes = await getCryptocurrencyById(asset_label, res.data?.name);
        setCryptoDetails(cryptoRes.data);

        captureEvent('crypto_details_viewed', {
          asset_label,
          name: res.data?.name,
          category: cryptoRes.data?.category,
        });

        setIsKlinesLoading(true);
        const klinesResponse = await getAllHourlyBinanceKlinesData(asset_label);
        setKlinesData(klinesResponse);
      } catch (e) {
        console.error("Failed to fetch recommendation details:", e);
        setDetailsData(undefined);
      }
    };
    getData();
  }, [asset_label]);

  return (
    <>
      {detailsData && cryptoDetails ? (
        <>
          <div className="container tw-pt-8">
            <Link to={routes.recommendation} className="tw-inline-block">
              <div className="tw-flex tw-items-center tw-text-gray-2 hover:tw-underline">
                <IoIosArrowBack />
                {t("Back to list")}
              </div>
            </Link>
          </div>

          <TitleHeader
            title={`${detailsData.name}`}
            badge={t("Cryptocurrency")}
            secondaryTitle={`${detailsData.asset_label}`}
            text={t("marketCapitalization", {
              val: formatMarketCap(Number(cryptoDetails.marketcap), i18n.language)
            })}
            img={cryptoDetails?.stylized_image ? `${coinURL}/${cryptoDetails.stylized_image}` : FallbackCoin}
            imgClassname="tw-h-[170px] tw--m-7 tw-mr-0"
            actionIcon={
              <WatchlistButton isInWatchList={isInWatchList} onToggle={handleToggleWatchList} size={24} className="-tw-translate-y-[8px]" />
            }
          />
          <div className="container mt-4">

            <Box>
              <StyledTabs
                value={value}
                onChange={handleChange}
              >
                <StyledTab value="recommendation" label={t("Buy & Sell Recommendations")} />
                <StyledTab value="strategies" label={t("Strategies Comparison")} />
                <StyledTab value="price" label={t("Price chart")} />
              </StyledTabs>
            </Box>

            <div className="tw-mt-4">
              {value === 'recommendation' && (
                <CryptoDetailsTab1 detailsData={detailsData} cryptoDetails={cryptoDetails} />
              )}
              {value === 'strategies' && (
                <CryptoDetailsTab2 assetLabel={asset_label} />
              )}
              {value === 'price' && (
                <CryptoDetailsTab3 klinesData={klinesData} isKlinesLoading={isKlinesLoading}></CryptoDetailsTab3>
              )}
            </div>
          </div>
        </>
      ) : <RecommendationDetailsSkeleton/>}
    </>
  );
};