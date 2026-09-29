import {WatchListType} from "../types/watchList/WatchListType.ts";
import {Link} from "react-router-dom";
import {WatchListEnum} from "../enums/WatchListEnum.ts";
import {coinURL, routes} from "../constants";
import {Dispatch, ReactNode, SetStateAction, useState} from "react";
import {CryptoCurrencyAdminType} from "../types/asset/CryptoCurrencyType.ts";
import {AssetDetailType} from "../types/asset/AssetDetailType.ts";
import {BinanceIndexAssetRecomBestPreviousDetails} from "../types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {useTranslation} from "react-i18next";
import {WatchlistButton} from "../../components/reusable/WatchlistButton.tsx";
import {removeFromWatchList} from "../api/watchListService.ts";
import Skeleton from "react-loading-skeleton";

export const renderTable = (
  title: ReactNode,
  items: WatchListType[],
  watchList: WatchListType[],
  setWatchList: Dispatch<SetStateAction<WatchListType[] | undefined>>,
  cryptocurrencies?: CryptoCurrencyAdminType[],
  recommendationData?: Map<string, AssetDetailType | BinanceIndexAssetRecomBestPreviousDetails>
) => {
  const {t} = useTranslation();
  const [removedItems, setRemovedItems] = useState<Record<number, boolean>>({});

  const visibleItems = items.filter(item => !removedItems[item.id]);

  const handleToggleWatchList = async (watchListItem: WatchListType): Promise<boolean> => {
    try {
      const response = await removeFromWatchList(watchListItem.item_id);

      if (response?.status === 200 || response?.status === 204) {
        setRemovedItems((prev) => ({
          ...prev,
          [watchListItem.id]: true,
        }));
        return true;
      }

      return false;
    } catch (e) {
      console.error("Error removing watchlist item:", e);
      return false;
    }
  };

  const getCryptoLogo = (title: string | null, itemType?: WatchListEnum): string | null => {
    if (!title || !cryptocurrencies) return null;
    if (itemType === WatchListEnum.Asset) return null;
    const crypto = cryptocurrencies.find(c => c.symbol && c.symbol.toUpperCase() === title.toUpperCase());
    return crypto?.photo ? `${coinURL}/${crypto.photo}` : null;
  }

  const getWeek0Profit = (title: string | null): number | null => {
    if (!title || !recommendationData) return null;
    const data = recommendationData.get(title) as (AssetDetailType | BinanceIndexAssetRecomBestPreviousDetails | undefined);
    return data?.week_0_profit ?? null;
  }

  const getMonth0Profit = (title: string | null): number | null => {
    if (!title || !recommendationData) return null;
    const data = recommendationData.get(title) as (AssetDetailType | BinanceIndexAssetRecomBestPreviousDetails | undefined);
    return data?.month_0_profit ?? null;
  }

  const getQuarter0Profit = (title: string | null): number | null => {
    if (!title || !recommendationData) return null;
    const data = recommendationData.get(title) as (AssetDetailType | BinanceIndexAssetRecomBestPreviousDetails | undefined);
    return data?.quarter_0_profit ?? null;
  }

  const getYear0Profit = (title: string | null): number | null => {
    if (!title || !recommendationData) return null;
    const data = recommendationData.get(title) as (AssetDetailType | BinanceIndexAssetRecomBestPreviousDetails | undefined);
    return data?.year_0_profit ?? null;
  }

  const formatProfit = (profit: number | null): string | null => {
    if (!profit) return null;
    const profitChange = profit - 1;
    return (profitChange * 100 > 0 ? "+" : "") + (profitChange * 100).toFixed(2) + "%";
  }

  const getProfitColorClass = (profit: number | null): string => {
    if (!profit) return "";
    const profitChange = profit - 1;
    return profitChange * 100 >= 0 ? "tw-text-emerald-500" : "tw-text-rose-500";
  }

  if (visibleItems.length === 0) return null;

  const isStatsTable = visibleItems.length > 0 && visibleItems.every(item => item.type === WatchListEnum.Coin || item.type === WatchListEnum.Asset);

  if (isStatsTable) {
    type TableColumn = {
      label: string;
      key: string;
      className: string;
      getValue: (item: WatchListType) => number | null;
    };

    const columns: TableColumn[] = [
      {
        label: "Week",
        key: "week",
        className: "tw-min-w-[72px] sm:tw-min-w-[80px] md:tw-min-w-[90px]",
        getValue: (item) => getWeek0Profit(item.title)
      },
      {
        label: "Month",
        key: "month",
        className: "tw-min-w-[72px] sm:tw-min-w-[80px] md:tw-min-w-[90px]",
        getValue: (item) => getMonth0Profit(item.title)
      },
      {
        label: "Quarter",
        key: "quarter",
        className: "tw-min-w-[72px] sm:tw-min-w-[80px] md:tw-min-w-[90px]",
        getValue: (item) => getQuarter0Profit(item.title)
      },
      {
        label: "Year",
        key: "year",
        className: "tw-min-w-[72px] sm:tw-min-w-[80px] md:tw-min-w-[90px]",
        getValue: (item) => getYear0Profit(item.title)
      }
    ];

    return (
      <div
        className="tw-w-full tw-max-w-full tw-min-w-0 tw-mb-6 tw-bg-stone-950 tw-bg-opacity-5 tw-border tw-border-solid tw-border-stone-400 tw-border-opacity-20 tw-rounded-2xl tw-p-3 sm:tw-p-4 md:tw-p-6">
        <h6 className="tw-mb-4">{title}</h6>
        <div className="tw-w-full tw-max-w-full tw-overflow-x-auto tw-overflow-y-hidden tw-touch-pan-x">
          <table className="tw-min-w-full sm:tw-min-w-[700px] md:tw-min-w-[760px] tw-border-collapse">
            <thead>
            <tr>
              <th rowSpan={2}
                  className="tw-text-start tw-font-bold tw-p-2 sm:tw-p-3 tw-w-[34%] md:tw-w-auto tw-text-xs sm:tw-text-sm">
                {t("Name")}
              </th>
              <th colSpan={columns.length}
                  className="tw-p-0 tw-text-center tw-font-normal tw-leading-3 tw-text-stone-400 tw-text-xs sm:tw-text-sm">
                {t("Change")}
              </th>
              <th rowSpan={2} className="tw-w-8 sm:tw-w-10 tw-p-2 sm:tw-p-3 tw-text-center"></th>
            </tr>
            <tr className="tw-border-b tw-border-stone-400 tw-border-opacity-25">
              {columns.map((col) => (
                <th key={col.key} className={`tw-p-2 sm:tw-p-3 tw-text-center tw-font-bold tw-whitespace-nowrap ${col.className} tw-text-xs sm:tw-text-sm`}>
                  {t(col.label)}
                </th>
              ))}
            </tr>
            </thead>
            <tbody>
            {visibleItems.map((item) => (
              <tr key={item.id}>
                {item.type === WatchListEnum.Coin && (
                  <td className="tw-p-1 sm:tw-p-2 tw-text-start">
                    <Link
                      to={`${routes.graphsRecommendationDetailURL}${item.title}`}
                      className="tw-flex tw-items-center tw-gap-2 sm:tw-gap-3 tw-text-inherit tw-no-underline"
                    >
                      {(() => {
                        const logoUrl = getCryptoLogo(item.title, item.type);
                        return logoUrl ? (
                          <img
                            src={logoUrl}
                            alt={item.title || "crypto"}
                            className="tw-h-7 tw-w-7 tw-shrink-0 tw-rounded-full tw-object-fill tw-bg-white"
                          />
                        ) : (
                          <div className="tw-h-7 tw-w-7 tw-shrink-0 tw-rounded-full tw-bg-secondary"/>
                        );
                      })()}
                      <span className="tw-block tw-w-full tw-max-w-full tw-text-xs sm:tw-text-sm md:tw-text-base tw-whitespace-normal tw-break-words tw-leading-5">
                        {item.title}
                      </span>
                    </Link>
                  </td>
                )}
                {item.type === WatchListEnum.Asset && (
                  <td className="tw-p-2 sm:tw-p-3 tw-text-start">
                    <Link
                      to={`${routes.assetGraphURL}${item.title}`}
                      className="tw-flex tw-items-center tw-gap-2 sm:tw-gap-3 tw-text-inherit tw-no-underline"
                    >
                      <span className="tw-block tw-w-full tw-max-w-full tw-text-xs sm:tw-text-sm md:tw-text-base tw-whitespace-normal tw-break-words tw-leading-5">
                        {item.title}
                      </span>
                    </Link>
                  </td>
                )}
                {columns.map((col) => {
                  const profit = col.getValue(item);
                  return (
                    <td key={col.key} className={`tw-p-2 sm:tw-p-3 tw-text-center tw-whitespace-nowrap tw-text-xs sm:tw-text-sm md:tw-text-base ${col.className}`}>
                      {profit ? (
                          <span className={getProfitColorClass(profit)}>
                              {formatProfit(profit)}
                          </span>
                        ) :
                        <Skeleton height={20} width={50}/>
                      }
                    </td>
                  );
                })}
                <td className="tw-w-8 sm:tw-w-10 tw-p-2 sm:tw-p-3 tw-text-center">
                  <WatchlistButton
                    itemId={item.item_id}
                    itemType={item.type}
                    isInWatchList={true}
                    onToggle={() => handleToggleWatchList(item)}
                    disabled={removedItems[item.id] ?? false}
                  />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="tw-bg-stone-950 tw-bg-opacity-5 tw-border tw-border-solid tw-border-stone-400 tw-border-opacity-20 tw-rounded-2xl sm:tw-p-4 md:tw-p-6">
        <h6 className="tw-mb-4">{title}</h6>
        <div className="tw-space-y-5">
          {visibleItems.map((item) => (
            <div key={item.id} className="tw-mb-5 tw-flex tw-items-center tw-justify-between">
              <Link
                to={item.type === WatchListEnum.Asset ? `${routes.assetGraphURL}${item.title}` : `${routes.articleURL}${item.item_id}`}
                className="tw-flex-1 tw-text-inherit tw-no-underline"
              >
                <div className="tw-flex tw-flex-1 tw-items-center tw-justify-between">
                  <div>
                    <p className="tw-mb-1">{item.title}</p>
                    <small className="tw-text-[var(--gray-2-color)]">
                      {item.created && new Date(item.created).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </Link>
              <WatchlistButton
                itemId={item.item_id}
                itemType={item.type}
                isInWatchList={true}
                onToggle={() => handleToggleWatchList(item)}
                className="tw-ms-3"
                disabled={removedItems[item.id] ?? false}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};