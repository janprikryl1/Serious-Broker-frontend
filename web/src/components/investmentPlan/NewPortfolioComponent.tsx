import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { coinURL, routes } from "../../utils/constants";
import { InvestmentPlanLayout } from "../profile/myPortfolio/InvestmentPlanLayout.tsx";
import { getBinanceIndexAssetRecomBestPrevious } from "../../utils/api/GraphsService.ts";
import {
  BinanceIndexAssetRecomBestPreviousType
} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import { RecommendationGraphEnum } from "../../utils/enums/RecommendationGraphEnum.tsx";
import { useInfiniteScroll } from "../../utils/hooks/useInfiniteScroll.ts";
import { NextStepButton } from "../reusable/NextStepButton.tsx";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { Button, ButtonColor } from "../reusable/Button.tsx";
import { Modal } from "react-bootstrap";
import { SearchBar } from "../reusable/SearchBar.tsx";
import { useMyPortfolioContext } from "../../utils/providers/MyPortfolioProvider.tsx";
import { CustomModal } from "../reusable/CustomModal.tsx";
import { useInvestmentPlanContext } from "../../utils/providers/InvestmentPlanProvider.tsx";
import { Assets } from "../../utils/types/asset/AssetDetailType.ts";
import { showToast } from "../toast/toastHelper.tsx";
import { GlassCard } from "../reusable/GlassCard.tsx";
import { AssetRowSkeleton } from "../graphs/asset/AssetRowSkeleton.tsx";
import { getAllCryptocurrenciesPhoto } from "../../utils/api/CryptocurrencyService.ts";
import { CryptoCurrencyAdminType } from "../../utils/types/asset/CryptoCurrencyType.ts";
import { getTradingCoins } from "../../utils/api/binanceIndexAssets.ts";
import { Checkbox } from "../reusable/Checkbox.tsx";
import {SelectCryptocurrenciesModal} from "../profile/myPortfolio/myPortfolioEdit/SelectCryptocurrenciesModal.tsx";
import {PortfolioFormCard} from "../profile/myPortfolio/myPortfolioEdit/PortfolioFormCard.tsx";
import baseGoldCoin from "../../utils/icons/coins/base_gold.png";

const distributeEvenAllocations = (assetsList: Assets[]): Assets[] => {
  const count = assetsList.length;
  if (count === 0) return [];

  const baseUnits = Math.floor(100 / count);
  const remainderUnits = 100 % count;

  return assetsList.map((item, index) => {
    const units = index < remainderUnits ? baseUnits + 1 : baseUnits;
    return {
      ...item,
      allocation: units / 100
    };
  });
};

/*export const NewPortfolioComponent: FC = () => {
  const { t } = useTranslation();
  const currentStep = 0;
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isFetchingRef = useRef<boolean>(false);
  const isInitialMount = useRef(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialOrderType = (searchParams.get("orderBy") as RecommendationGraphEnum) || RecommendationGraphEnum.CMC_RANK;
  const initialSortDirection = (searchParams.get("direction") as "asc" | "desc") || "asc";
  const initialSearchQuery = searchParams.get("searchQuery") || "";
  const initialIncludeCurrencies = searchParams.get("includeCurrencies")
    ? searchParams.get("includeCurrencies")!.split("|")
    : [];
  const [orderType, setOrderType] = useState<RecommendationGraphEnum>(initialOrderType);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(initialSortDirection);
  const [includeCurrencies, setIncludedCurrencies] = useState<string[]>(initialIncludeCurrencies);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [data, setData] = useState<BinanceIndexAssetRecomBestPreviousType[]>([]);
  const [allCurrencies, setAllCurrencies] = useState<CryptoCurrencyAdminType[]>([]);
  const [tradingCoins, setTradingCoins] = useState<string[]>([]);
  const [showNonTradingCoins, setShowNonTradingCoins] = useState<boolean>(false);
  const { currentPage, loaderRef, resetPage } = useInfiniteScroll({
    totalPages,
    loading,
    root: scrollContainer
  });
  const [selectedRowIds, setSelectedRowIds] = useState<(number | string)[]>([]);
  const [portfolioName, setPortfolioName] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [invalidAllocation, setInvalidAllocation] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);

  const {
    name,
    setName: setContextName,
    asset,
    setAsset: setContextAsset,
    saveChanges,
  } = useMyPortfolioContext();

  const {
    setIsCustomPortfolio,
    setUserPortfolioId,
    setBinanceAssetId
  } = useInvestmentPlanContext();

  const handleClosePortfolioModal = () => setShowPortfolioModal(false);
  const handleShowPortfolioModal = () => setShowPortfolioModal(true);
  const handleCloseFinalModal = () => setShowFinalModal(false);
  const handleShowFinalModal = () => setShowFinalModal(true);
  const isNameEmpty = !name || name.trim() === "";
  const isFormInvalid = invalidAllocation || isNameEmpty;

  const getMarketCapValue = (item: any) => {
    const rawValue = item?.marketCap ?? item?.marketcap ?? 0;
    return Number.isFinite(rawValue) ? rawValue : 0;
  };

  const sortedSelectedAssets = useMemo(() => {
    return [...asset].sort((a, b) => getMarketCapValue(b) - getMarketCapValue(a));
  }, [asset]);

  useEffect(() => {
    (async () => {
      try {
        const currenciesResponse = await getAllCryptocurrenciesPhoto();
        if (currenciesResponse) {
          setAllCurrencies(currenciesResponse.data);
        }
      } catch (error) {
        console.error("Failed to load photos:", error);
      }
    })();

    (async () => {
      try {
        const tradingCoinsResponse = await getTradingCoins();
        if (tradingCoinsResponse && tradingCoinsResponse.data) {
          setTradingCoins(tradingCoinsResponse.data);
        }
      } catch (error) {
        console.error("Failed to load active coins:", error);
      }
    })();
  }, []);

  const fetchData = useCallback(async (pageToFetch: number, isReset: boolean = false) => {
    if (isFetchingRef.current) return;
    if (!isReset && pageToFetch > totalPages) return;

    isFetchingRef.current = true;
    setLoading(true);
    try {
      const res = await getBinanceIndexAssetRecomBestPrevious(
        orderType,
        pageToFetch,
        sortDirection,
        { includeCurrencies, searchQuery }
      );

      if (res && res.data) {
        setData((prev) => (isReset ? res.data.data : [...prev, ...res.data.data]));
        setTotalPages(res.data.totalPages);
      }
    } catch (e) {
      console.error("Error fetching recommendations:", e);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [orderType, sortDirection, includeCurrencies, searchQuery, totalPages]);

  useEffect(() => {
    resetPage();
    fetchData(1, true);
  }, [orderType, sortDirection]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const handler = setTimeout(() => {
      resetPage();
      fetchData(1, true);
    }, 500);
    return () => clearTimeout(handler);
  }, [includeCurrencies, searchQuery]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchData(currentPage, false);
    }
  }, [currentPage]);

  const handleSort = (column: RecommendationGraphEnum) => {
    let newDirection: "asc" | "desc" = "asc";
    if (column === orderType) {
      newDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      newDirection = "desc";
    }

    setOrderType(column);
    setSortDirection(newDirection);

    setSearchParams((prev) => {
      prev.set("orderBy", column);
      prev.set("direction", newDirection);
      return prev;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchParams((prev) => {
      if (value) prev.set("searchQuery", value);
      else prev.delete("searchQuery");
      return prev;
    });
  };

  const filteredData = showNonTradingCoins
    ? data
    : data.filter((item) => tradingCoins.includes(item.asset_label.toUpperCase()));

  const getRowIdentifier = (item: BinanceIndexAssetRecomBestPreviousType): number | string => {
    return (item as any)?.asset_id ?? (item as any)?.id ?? item.asset_label;
  };

  const handleRowClick = (item: BinanceIndexAssetRecomBestPreviousType) => {
    const id = getRowIdentifier(item);
    setSelectedRowIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((existingId) => existingId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  const handleAllocationChange = (id: number, value: string) => {
    const numPercent = value === "" ? 0 : parseFloat(value);
    const decimalValue = numPercent / 100;

    setContextAsset((prevAssets) =>
      prevAssets.map((assetItem) => {
        if (assetItem.id === id) {
          return { ...assetItem, allocation: decimalValue };
        }
        return assetItem;
      })
    );
  };

  const handleRemoveAsset = (symbol: string) => {
    setContextAsset((prevAssets) => {
      const remaining = prevAssets.filter((assetItem) => assetItem.asset_label !== symbol);
      return distributeEvenAllocations(remaining);
    });
  };

  const handleRecomputeAllocations = () => {
    if (asset.length === 0) return;
    setContextAsset((prevAssets) => distributeEvenAllocations(prevAssets));
    showToast.info(t("Allocations recomputed to 100%"));
  };

  useEffect(() => {
    if (asset.length === 0) {
      setInvalidAllocation(true);
      return;
    }
    const sum = asset.reduce((acc, curr) => acc + (Number(curr.allocation) || 0), 0);
    const isValid = Math.abs(sum - 1.0) < 0.001;
    setInvalidAllocation(!isValid);
  }, [asset]);

  const addAssets = () => {
    const selectedItems = data.filter((item) => selectedRowIds.includes(getRowIdentifier(item)));

    const newAssets: Assets[] = selectedItems.map((item) => {
        const photoObj = allCurrencies.find(
          (c) => c.symbol.toUpperCase() === item.asset_label.toUpperCase()
        );
        const isTrading = tradingCoins.includes(item.asset_label.toUpperCase());

        return {
          id: (item as any)?.id ?? (item as any)?.asset_id ?? Math.floor(Math.random() * 100000),
          asset_label: item.asset_label,
          name: item.name,
          allocation: 0,
          photo: typeof photoObj?.photo === "string" ? photoObj.photo : "",
          status: isTrading
        };
      });

    setContextAsset((prevAssets) => {
      const uniqueNewAssets = newAssets.filter(
        (newAsset) => !prevAssets.some((existing) => existing.asset_label === newAsset.asset_label)
      );
      const combined = [...prevAssets, ...uniqueNewAssets];
      return distributeEvenAllocations(combined);
    });

    setSelectedRowIds([]);
    handleClosePortfolioModal();
  };

  const createPortfolio = async () => {
    if (invalidAllocation) return;

    const response = await saveChanges();
    if (!response) return;

    if (response.status === 200 || response.status === 201) {
      setIsCustomPortfolio(true);
      setBinanceAssetId(null);
      if (response.data?.data?.id) setUserPortfolioId(response.data.data.id);
      handleShowFinalModal();
    }
  };

  useEffect(() => {
    setContextName("");
  }, []);

  return (
    <>
      <InvestmentPlanLayout title="New Investment Plan" currentStep={currentStep} currentStepFinished={false}>
        <h5 className="tw-mb-0 tw-pb-0 tw-text-base sm:tw-text-lg">{t("Create New Portfolio")}</h5>
        <Link to={routes.profile.newInvestmentPlanExistingPortfolio}
              className="link-underline tw-text-xs sm:tw-text-sm">
          {t("Choose from Existing Portfolios instead")}
        </Link>

        <div className="tw-flex tw-flex-col tw-items-center lg:tw-items-start tw-w-full">
          <GlassCard
            className="tw-mt-6 !tw-mx-0 !tw-px-5 sm:!tw-p-6 tw-max-w-xl tw-min-w-[30rem]"
            bgColor={invalidAllocation ? "var(--red-color)" : "var(--true-black)"}
            opacity={invalidAllocation ? 0.2 : 0.1}
          >
            <div className="tw-text-xs sm:tw-text-sm tw-text-stone-400">{t("Name")}</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder={t("Enter portfolio name...")}
                className="form-control outline-input tw-outline tw-outline-[rgba(168,162,158,0.2)]"
                value={name}
                onChange={(e) => {
                  setContextName(e.target.value);
                  setPortfolioName(e.target.value);
                }}
              />
            </div>

            {/!* Show selected assets *!/}
            <div className="tw-mt-10 tw-w-full !tw-bg-transparent">
              {sortedSelectedAssets.length > 0 ? (
                <>
                  <div
                    className="tw-grid tw-grid-cols-[1fr_auto] tw-items-center tw-pb-2 tw-border-0 tw-border-b tw-border-solid tw-border-stone-500 tw-border-opacity-30 tw-text-xs sm:tw-text-sm tw-font-semibold tw-text-stone-300 !tw-bg-transparent">
                    <div>{t("Name")}</div>
                    <div className="tw-text-right tw-pr-8 sm:tw-pr-9">{t("Allocation")}</div>
                  </div>

                  <div className="tw-divide-y tw-divide-stone-700 !tw-bg-transparent">
                    {sortedSelectedAssets.map((assetItem) => (
                      <div
                        key={assetItem.id}
                        className="tw-grid tw-grid-cols-[1fr_auto] tw-items-center tw-py-2.5 sm:tw-py-3 !tw-bg-transparent"
                      >
                        <div className="tw-flex tw-items-center tw-gap-2.5 sm:tw-gap-3.5 tw-min-w-0">
                          <img
                            src={`${coinURL}/${assetItem.photo}`}
                            alt={assetItem.name}
                            className="tw-w-7 tw-h-7 sm:tw-w-8 sm:tw-h-8 tw-rounded-full tw-object-cover tw-shrink-0 tw-bg-white"
                          />
                          <div className="tw-flex tw-items-center tw-gap-1.5 sm:tw-gap-2 tw-truncate">
                            <span className="tw-text-xs sm:tw-text-sm tw-font-medium tw-truncate">
                              {assetItem.name}
                            </span>
                            <span className="tw-text-[11px] sm:tw-text-xs tw-text-[var(--gray-2-color)] tw-shrink-0">
                              {assetItem.asset_label}
                            </span>
                          </div>
                        </div>

                        <div className="tw-flex tw-items-center tw-gap-2 sm:tw-gap-3 tw-justify-end">
                          <div className="tw-flex tw-items-center tw-gap-1">
                            <input
                              type="number"
                              step="1"
                              min="0"
                              max="100"
                              value={Math.round((Number(assetItem.allocation) || 0) * 100)}
                              onChange={(e) => handleAllocationChange(assetItem.id, e.target.value)}
                              className="form-control outline-input tw-outline tw-outline-1 tw-outline-[rgba(168,162,158,0.2)] tw-w-14 sm:tw-w-16 tw-h-8 sm:tw-h-9 tw-px-1.5 tw-text-right tw-text-xs sm:tw-text-sm !tw-bg-transparent"
                            />
                            <span className="tw-text-xs sm:tw-text-sm tw-text-stone-400">%</span>
                          </div>

                          <button
                            type="button"
                            className="tw-p-0.5 tw-text-rose-500 hover:tw-text-rose-400 tw-transition-colors tw-bg-transparent tw-border-0 tw-flex tw-items-center tw-justify-center"
                            onClick={() => handleRemoveAsset(assetItem.asset_label)}
                            title={t("Remove")}
                          >
                            <IoIosClose size={26} className="sm:tw-w-7 sm:tw-h-7"/>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div
                  className="tw-py-8 tw-text-center tw-text-stone-400 tw-text-xs sm:tw-text-sm">
                  {t("No cryptocurrencies selected yet.")}
                </div>
              )}
            </div>

            {/!* Buttons: Add new cryptocurrency & Recompute *!/}
            <div className="d-flex justify-content-center align-items-center gap-3 mt-4 tw-flex-wrap">
              <Button
                onClick={handleShowPortfolioModal}
                color={ButtonColor.transparent}
                style={{
                  padding: "5px 12px 5px 6px",
                  border: "1px solid color-mix(in srgb, var(--secondary-color), transparent 40%)"
                }}
              >
                <div className="d-flex align-items-center gap-1 tw-text-secondary">
                  <FiPlus size={22}/>
                  <span className="tw-text-xs sm:tw-text-sm">{t("Add new cryptocurrency")}</span>
                </div>
              </Button>

              {asset.length > 0 && (
                <Button
                  onClick={handleRecomputeAllocations}
                  color={ButtonColor.transparent}
                  style={{
                    padding: "5px 12px",
                    border: "1px solid color-mix(in srgb, var(--secondary-color), transparent 40%)"
                  }}
                >
                  <div className="d-flex align-items-center gap-2 tw-text-secondary">
                    <FiRefreshCw size={16}/>
                    <span className="tw-text-xs sm:tw-text-sm">{t("Recompute allocations")}</span>
                  </div>
                </Button>
              )}
            </div>
          </GlassCard>
        </div>

        {isNameEmpty && (
          <div className="tw-text-rose-500 tw-mt-2 tw-text-sm sm:tw-text-base">
            {t("Portfolio name is required.")}
          </div>
        )}

        {invalidAllocation && (
          <div className="tw-text-rose-500 tw-mt-2 tw-text-sm sm:tw-text-base">
            {t("Allocation must be 100% in total.")}
          </div>
        )}

        <div className="tw-flex tw-flex-col tw-items-center lg:tw-items-start tw-w-full tw-mt-6">
          <Button disabled={invalidAllocation} onClick={createPortfolio}>{t("Create")}</Button>
        </div>
      </InvestmentPlanLayout>

      {/!* Portfolio Modal *!/}
      <Modal
        show={showPortfolioModal}
        onHide={handleClosePortfolioModal}
        size="xl"
        centered
        contentClassName="custom-modal"
        backdropClassName="custom-backdrop"
      >
        <Modal.Header className="tw-flex tw-flex-col tw-items-start tw-border-0">
          <Modal.Title>{t("Select multiple cryptocurrencies")}</Modal.Title>
          <div
            className="tw-mt-10 tw-flex tw-flex-col lg:tw-flex-row tw-gap-4 lg:tw-gap-16 tw-items-start lg:tw-items-center tw-w-full">
            <div className="tw-w-full sm:tw-max-w-xs">
              <SearchBar value={searchQuery} onChange={handleSearchChange}
                         className="outline-searchbar tw-border tw-border-solid tw-border-stone-400 tw-border-opacity-30"/>
            </div>
            <div className="tw-text-xs sm:tw-text-sm">
              <Checkbox
                checked={showNonTradingCoins}
                onChange={setShowNonTradingCoins}
                label={t("Show non-traded cryptocurrencies")}
              />
            </div>
          </div>
        </Modal.Header>

        <Modal.Body className="tw-pb-0">
          <div
            className="scrollable-table-container tw-max-h-[min(55vh,520px)] tw-overflow-y-auto tw-overflow-x-auto"
            ref={setScrollContainer}
          >
            {loading && filteredData.length === 0 ? (
              <AssetRowSkeleton/>
            ) : filteredData.length > 0 ? (
              <div
                className="tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-[color-mix(in_srgb,var(--secondary-color),transparent_30%)] tw-overflow-hidden">
                {/!* Desktop Table Header *!/}
                <div
                  className="tw-hidden lg:tw-flex tw-items-center tw-w-full tw-bg-transparent tw-rounded-t-lg tw-border-0 tw-border-b tw-border-solid tw-border-[color-mix(in_srgb,var(--secondary-color),transparent_30%)] tw-text-base tw-text-stone-200">
                  <div
                    className="tw-w-14 tw-shrink-0 tw-flex tw-items-center tw-justify-center tw-py-3 tw-bg-transparent"></div>

                  <div
                    className="tw-w-24 tw-shrink-0 tw-flex tw-items-center tw-px-3 tw-py-2 tw-cursor-pointer tw-leading-tight hover:tw-text-amber-400 tw-transition-colors tw-bg-transparent"
                    onClick={() => handleSort(RecommendationGraphEnum.CMC_RANK)}
                  >
                    {t("CMC")}<br/>{t("Position")} {orderType === RecommendationGraphEnum.CMC_RANK && (sortDirection === "asc" ? "▲" : "▼")}
                  </div>

                  <div
                    className="tw-flex-1 tw-min-w-0 tw-flex tw-items-center tw-px-3 tw-py-2 tw-cursor-pointer hover:tw-text-amber-400 tw-transition-colors tw-bg-transparent"
                    onClick={() => handleSort(RecommendationGraphEnum.ALL_SUG)}
                  >
                    <span className="tw-truncate">
                      {t("Name")} {orderType === RecommendationGraphEnum.ALL_SUG && (sortDirection === "asc" ? "▲" : "▼")}
                    </span>
                  </div>

                  <div
                    className="tw-w-36 tw-shrink-0 tw-flex tw-items-center tw-justify-center tw-px-3 tw-py-2 tw-cursor-pointer hover:tw-text-amber-400 tw-transition-colors tw-bg-transparent"
                    onClick={() => handleSort(RecommendationGraphEnum.WEEK_ALL_PROFIT)}
                  >
                    {t("Profit (7d)")} {orderType === RecommendationGraphEnum.WEEK_ALL_PROFIT && (sortDirection === "asc" ? "▲" : "▼")}
                  </div>

                  <div
                    className="tw-w-40 tw-shrink-0 tw-flex tw-items-center tw-justify-center tw-px-3 tw-py-2 tw-text-center tw-bg-transparent">
                    {t("Status")}
                  </div>
                </div>

                <div className="tw-divide-y tw-divide-stone-800 tw-bg-transparent">
                  {filteredData.map((item) => {
                    const rowId = getRowIdentifier(item);
                    const isSelected = selectedRowIds.includes(rowId);
                    const assetSymbol = item.asset_label.trim().toUpperCase();
                    const foundAssetCoin = allCurrencies.find(coin => coin.symbol.toUpperCase() === assetSymbol);
                    const isAssetTrading = tradingCoins.includes(item.asset_label.toUpperCase());
                    const profitChange = item.week_0_profit - 1;

                    return (
                      <div
                        key={rowId}
                        onClick={() => handleRowClick(item)}
                        className={`tw-cursor-pointer tw-transition-colors tw-duration-200 ${
                          isSelected ? "tw-bg-[color-mix(in_srgb,var(--secondary-color),transparent_70%)]" : "hover:tw-bg-white/[0.04]"
                        }`}
                      >
                        <div
                          className="tw-flex lg:tw-hidden tw-flex-col tw-p-3.5 tw-py-6 tw-gap-2.5 tw-border-0 tw-border-b tw-border-solid tw-border-stone-400 tw-border-opacity-15">
                          <div className="tw-flex tw-items-center tw-justify-between">
                            <div className="tw-flex tw-items-center tw-gap-2.5 tw-min-w-0">
                              <div className="tw-shrink-0 tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center">
                                {foundAssetCoin && foundAssetCoin.stylized_image ? (
                                  <img
                                    src={`${coinURL}/${foundAssetCoin.stylized_image}`}
                                    alt={assetSymbol}
                                    className="tw-w-full tw-h-full tw-object-contain"
                                  />
                                ) : (
                                  <img
                                    src={baseGoldCoin}
                                    alt={assetSymbol}
                                    className="tw-w-full tw-h-full tw-object-contain"
                                  />
                                )}
                              </div>
                              <div className="tw-flex tw-flex-col tw-min-w-0">
                                <span
                                  className="tw-truncate tw-font-semibold tw-text-base sm:tw-text-base tw-text-stone-100">
                                  {item.name}
                                </span>
                                <span className="tw-text-sm tw-text-stone-400">
                                  {assetSymbol}
                                </span>
                              </div>
                            </div>

                            <div
                              className="tw-shrink-0 tw-pl-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Checkbox
                                checked={isSelected}
                                onChange={() => handleRowClick(item)}
                                label={""}
                              />
                            </div>
                          </div>

                          <div className="tw-grid tw-grid-cols-2 tw-gap-5 tw-pt-1.5">
                            <div>
                              <div className="tw-text-xs tw-text-[var(--gray-2-color)]">
                                {t("CMC Position")}
                              </div>
                              <div className="tw-text-base sm:tw-text-sm tw-font-medium tw-text-stone-200">
                                #{item.cmc_rank ?? "-"}
                              </div>
                            </div>

                            <div>
                              <div className="tw-text-xs tw-text-[var(--gray-2-color)]">
                                {t("Profit (7d)")}
                              </div>
                              <div
                                className={`tw-text-base sm:tw-text-sm tw-font-medium ${profitChange >= 0 ? 'tw-text-[var(--green-color)]' : 'tw-text-[var(--red-color)]'}`}>
                                {profitChange ?
                                  (profitChange * 100 > 0 ? "+" : "") +
                                  (profitChange * 100).toFixed(2) + "%"
                                  : "-"}
                              </div>
                            </div>

                            <div className="tw-col-span-2">
                              <div className="tw-text-xs tw-text-[var(--gray-2-color)] tw-mb-1">
                                {t("Status")}
                              </div>
                              <div
                                className={`status-container d-flex align-items-center justify-content-center tw-text-xs sm:tw-text-sm ${
                                  isAssetTrading ? 'color-container--green' : 'color-container--red'
                                }`}
                                style={{
                                  color: isAssetTrading ? 'var(--green-color)' : 'var(--red-color)'
                                }}
                              >
                                {isAssetTrading ? t('Trading') : t('Not Trading')}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="tw-hidden lg:tw-flex tw-items-center tw-w-full tw-text-base">
                          <div
                            className="tw-w-14 tw-shrink-0 tw-flex tw-items-center tw-justify-center tw-py-2 tw-bg-transparent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Checkbox
                              checked={isSelected}
                              onChange={() => handleRowClick(item)}
                              label={""}
                            />
                          </div>

                          <div
                            className="tw-w-24 tw-shrink-0 tw-flex tw-items-center tw-px-3 tw-py-2 tw-text-stone-400 tw-bg-transparent">
                            {item.cmc_rank ?? "-"}
                          </div>

                          <div
                            className="tw-flex-1 tw-min-w-0 tw-flex tw-items-center tw-gap-3 tw-px-3 tw-py-2 tw-bg-transparent"
                            title={item.name}
                          >
                            <div className="tw-shrink-0 tw-w-9 tw-h-9 tw-flex tw-items-center tw-justify-center">
                              {foundAssetCoin && foundAssetCoin.stylized_image ? (
                                <img
                                  src={`${coinURL}/${foundAssetCoin.stylized_image}`}
                                  alt={assetSymbol}
                                  className="tw-w-full tw-h-full tw-object-contain"
                                />
                              ) : (
                                <img
                                  src={baseGoldCoin}
                                  alt={assetSymbol}
                                  className="tw-w-full tw-h-full tw-object-contain"
                                />
                              )}
                            </div>
                            <span className="tw-truncate tw-font-medium">
                              {item.name}
                            </span>
                            <span className="tw-text-sm tw-text-stone-400">
                              {assetSymbol}
                            </span>
                          </div>

                          <div
                            className={`tw-w-36 tw-shrink-0 tw-flex tw-items-center tw-justify-center tw-px-3 tw-py-2 tw-bg-transparent ${profitChange >= 0 ? 'tw-text-[var(--green-color)]' : 'tw-text-[var(--red-color)]'}`}>
                            {profitChange ?
                              (profitChange * 100 > 0 ? "+" : "") +
                              (profitChange * 100).toFixed(2) + "%"
                              : "-"}
                          </div>

                          <div
                            className="tw-w-40 tw-shrink-0 tw-flex tw-items-center tw-justify-center tw-px-3 tw-py-2 tw-bg-transparent">
                            <div
                              className={`status-container d-flex align-items-center justify-content-center ${
                                isAssetTrading ? 'color-container--green' : 'color-container--red'
                              }`}
                              style={{
                                color: isAssetTrading ? 'var(--green-color)' : 'var(--red-color)'
                              }}
                            >
                              {isAssetTrading ? t('Trading') : t('Not Trading')}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div ref={loaderRef}>
                  {loading && <AssetRowSkeleton/>}
                </div>
              </div>
            ) : (
              <div className="tw-p-20 tw-text-center tw-text-stone-400">{t("No data found")}</div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer className="custom-modal-footer tw-flex tw-justify-between tw-items-center">
          <span className="tw-text-xs sm:tw-text-sm tw-text-stone-400">
            {t("Selected")}: <strong className="tw-text-stone-200">{selectedRowIds.length}</strong>
          </span>
          <Button onClick={addAssets} disabled={selectedRowIds.length === 0}>
            {t("Add")}
          </Button>
        </Modal.Footer>
      </Modal>

      {/!* Final modal *!/}
      <CustomModal
        title={t("Portfolio {{name}} created", { name: name || portfolioName })}
        type={"success"}
        showModal={showFinalModal}
        closeModal={handleCloseFinalModal}
      >
        <NextStepButton
          currentStep={currentStep}
          currentStepFinished={!invalidAllocation}
          link={routes.profile.newInvestmentPlanRecurringInvestment}
        />
      </CustomModal>
    </>
  );
};*/











export const NewPortfolioComponent: FC = () => {
  const { t } = useTranslation();
  const currentStep = 0;
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { name, setName, asset, setAsset, saveChanges } = useMyPortfolioContext();
  const { setIsCustomPortfolio, setUserPortfolioId, setBinanceAssetId } = useInvestmentPlanContext();

  const handleAllocationChange = (id: number, value: string) => {
    const numPercent = value === "" ? 0 : parseFloat(value);
    setAsset(prev => prev.map(a => a.id === id ? { ...a, allocation: numPercent / 100 } : a));
  };

  const handleRemoveAsset = (symbol: string) => {
    setAsset(prev => distributeEvenAllocations(prev.filter(a => a.asset_label !== symbol)));
  };

  const handleRecompute = () => {
    setAsset(prev => distributeEvenAllocations(prev));
    showToast.info(t("Allocations recomputed to 100%"));
  };

  const handleAddAssetsFromModal = (newAssets: Assets[]) => {
    setAsset(prev => {
      const unique = newAssets.filter(na => !prev.some(p => p.asset_label === na.asset_label));
      return distributeEvenAllocations([...prev, ...unique]);
    });
  };

  const createPortfolio = async () => {
    setHasSubmitted(true);
    const sum = asset.reduce((acc, curr) => acc + (Number(curr.allocation) || 0), 0);
    if (!name.trim() || asset.length === 0 || Math.abs(sum - 1.0) >= 0.001) return;

    try {
      const response = await saveChanges();
      if (response && (response.status === 200 || response.status === 201)) {
        setIsCustomPortfolio(true);
        setBinanceAssetId(null);
        if (response.data?.data?.id) setUserPortfolioId(response.data.data.id);
        setShowFinalModal(true);
      }
    } catch {
      showToast.error(t("Error while saving portfolio, please try again"));
    }
  };

  return (
    <InvestmentPlanLayout title="New Investment Plan" currentStep={currentStep} currentStepFinished={false}>
      <h5>{t("Create New Portfolio")}</h5>
      <Link to={routes.profile.newInvestmentPlanExistingPortfolio}>
        {t("Choose from Existing Portfolios instead")}
      </Link>

      <PortfolioFormCard
        name={name}
        onNameChange={setName}
        assets={asset}
        onAllocationChange={handleAllocationChange}
        onRemoveAsset={handleRemoveAsset}
        onRecompute={handleRecompute}
        onOpenAddModal={() => setShowPortfolioModal(true)}
        hasSubmitted={hasSubmitted}
      />

      <div className="tw-mt-6">
        <Button onClick={createPortfolio}>{t("Create")}</Button>
      </div>

      <SelectCryptocurrenciesModal
        show={showPortfolioModal}
        onClose={() => setShowPortfolioModal(false)}
        onAddAssets={handleAddAssetsFromModal}
        existingAssetSymbols={asset.map(a => a.asset_label)}
      />

      <CustomModal
        title={t("Portfolio {{name}} created", { name })}
        type="success"
        showModal={showFinalModal}
        closeModal={() => setShowFinalModal(false)}
      >
        <NextStepButton
          currentStep={currentStep}
          currentStepFinished={true}
          link={routes.profile.newInvestmentPlanRecurringInvestment}
        />
      </CustomModal>
    </InvestmentPlanLayout>
  );
};
