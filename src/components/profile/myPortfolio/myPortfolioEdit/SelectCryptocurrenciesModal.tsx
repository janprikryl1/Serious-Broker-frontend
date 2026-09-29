import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { coinURL } from "../../../../utils/constants";
import { Assets } from "../../../../utils/types/asset/AssetDetailType.ts";
import { BinanceIndexAssetRecomBestPreviousType } from "../../../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import { RecommendationGraphEnum } from "../../../../utils/enums/RecommendationGraphEnum.tsx";
import { CryptoCurrencyAdminType } from "../../../../utils/types/asset/CryptoCurrencyType.ts";
import { getBinanceIndexAssetRecomBestPrevious } from "../../../../utils/api/GraphsService.ts";
import { getAllCryptocurrenciesPhoto } from "../../../../utils/api/CryptocurrencyService.ts";
import { getTradingCoins } from "../../../../utils/api/binanceIndexAssets.ts";
import { useInfiniteScroll } from "../../../../utils/hooks/useInfiniteScroll.ts";
import { SearchBar } from "../../../reusable/SearchBar.tsx";
import { Checkbox } from "../../../reusable/Checkbox.tsx";
import { Button } from "../../../reusable/Button.tsx";
import { AssetRowSkeleton } from "../../../graphs/asset/AssetRowSkeleton.tsx";
import baseGoldIcon from "../../../../utils/icons/coins/base_gold.png";

export type SelectCryptocurrenciesModalProps = {
  show: boolean;
  onClose: () => void;
  onAddAssets: (newAssets: Assets[]) => void;
  existingAssetSymbols?: string[];
};

export const SelectCryptocurrenciesModal: FC<SelectCryptocurrenciesModalProps> = ({
                                                                                    show,
                                                                                    onClose,
                                                                                    onAddAssets,
                                                                                  }) => {
  const { t } = useTranslation();
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isFetchingRef = useRef<boolean>(false);
  const isInitialMount = useRef(true);

  const [orderType, setOrderType] = useState<RecommendationGraphEnum>(
    RecommendationGraphEnum.CMC_RANK
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);

  const [data, setData] = useState<BinanceIndexAssetRecomBestPreviousType[]>([]);
  const [allCurrencies, setAllCurrencies] = useState<CryptoCurrencyAdminType[]>([]);
  const [tradingCoins, setTradingCoins] = useState<string[]>([]);
  const [showNonTradingCoins, setShowNonTradingCoins] = useState<boolean>(false);
  const [selectedRowIds, setSelectedRowIds] = useState<(number | string)[]>([]);

  const { currentPage, loaderRef, resetPage } = useInfiniteScroll({
    totalPages,
    loading,
    root: scrollContainer,
  });

  // Načítanie fotografií a obchodovateľných mincí
  useEffect(() => {
    (async () => {
      try {
        const currenciesResponse = await getAllCryptocurrenciesPhoto();
        if (currenciesResponse?.data) {
          setAllCurrencies(currenciesResponse.data);
        }
      } catch (error) {
        console.error("Failed to load photos:", error);
      }
    })();

    (async () => {
      try {
        const tradingCoinsResponse = await getTradingCoins();
        if (tradingCoinsResponse?.data) {
          setTradingCoins(tradingCoinsResponse.data);
        }
      } catch (error) {
        console.error("Failed to load active coins:", error);
      }
    })();
  }, []);

  const fetchData = useCallback(
    async (pageToFetch: number, isReset: boolean = false) => {
      if (isFetchingRef.current) return;
      if (!isReset && pageToFetch > totalPages) return;

      isFetchingRef.current = true;
      setLoading(true);
      try {
        const res = await getBinanceIndexAssetRecomBestPrevious(
          orderType,
          pageToFetch,
          sortDirection,
          { includeCurrencies: [], searchQuery }
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
    },
    [orderType, sortDirection, searchQuery, totalPages]
  );

  useEffect(() => {
    if (!show) return;
    resetPage();
    fetchData(1, true);
  }, [show, orderType, sortDirection]);

  useEffect(() => {
    if (!show) return;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const handler = setTimeout(() => {
      resetPage();
      fetchData(1, true);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery, show]);

  useEffect(() => {
    if (!show) return;
    if (currentPage > 1) {
      fetchData(currentPage, false);
    }
  }, [currentPage, show]);

  const handleSort = (column: RecommendationGraphEnum) => {
    let newDirection: "asc" | "desc" = "asc";
    if (column === orderType) {
      newDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      newDirection = "desc";
    }
    setOrderType(column);
    setSortDirection(newDirection);
  };

  const filteredData = showNonTradingCoins
    ? data
    : data.filter((item) => tradingCoins.includes(item.asset_label.toUpperCase()));

  const getRowIdentifier = (
    item: BinanceIndexAssetRecomBestPreviousType
  ): number | string => {
    return (item as any)?.asset_id ?? (item as any)?.id ?? item.asset_label;
  };

  const handleRowClick = (item: BinanceIndexAssetRecomBestPreviousType) => {
    const id = getRowIdentifier(item);
    setSelectedRowIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((existingId) => existingId !== id)
        : [...prevIds, id]
    );
  };

  const handleAddSelected = () => {
    const selectedItems = data.filter((item) =>
      selectedRowIds.includes(getRowIdentifier(item))
    );

    const mappedAssets: Assets[] = selectedItems.map((item) => {
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
        status: isTrading,
        marketCap: (item as any)?.marketCap ?? 0,
      };
    });

    onAddAssets(mappedAssets);
    setSelectedRowIds([]);
    onClose();
  };

  const handleModalClose = () => {
    setSelectedRowIds([]);
    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleModalClose}
      size="xl"
      centered
      contentClassName="custom-modal"
      backdropClassName="custom-backdrop"
    >
      <Modal.Header className="tw-flex tw-flex-col tw-items-start tw-border-0">
        <Modal.Title>{t("Select multiple cryptocurrencies")}</Modal.Title>
        <div className="tw-mt-10 tw-flex tw-flex-col lg:tw-flex-row tw-gap-4 lg:tw-gap-16 tw-items-start lg:tw-items-center tw-w-full">
          <div className="tw-w-full sm:tw-max-w-xs">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-searchbar tw-border tw-border-solid tw-border-stone-400 tw-border-opacity-30"
            />
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
            <AssetRowSkeleton />
          ) : filteredData.length > 0 ? (
            <div className="tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-[color-mix(in_srgb,var(--secondary-color),transparent_30%)] tw-overflow-hidden">
              {/* Desktop Table Header (>= 992px) */}
              <div className="tw-hidden lg:tw-flex tw-items-center tw-w-full tw-bg-transparent tw-rounded-t-lg tw-border-0 tw-border-b tw-border-solid tw-border-[color-mix(in_srgb,var(--secondary-color),transparent_30%)] tw-text-base tw-text-stone-200">
                <div className="tw-w-14 tw-shrink-0 tw-flex tw-items-center tw-justify-center tw-py-3 tw-bg-transparent" />

                <div
                  className="tw-w-24 tw-shrink-0 tw-flex tw-items-center tw-px-3 tw-py-2 tw-cursor-pointer tw-leading-tight hover:tw-text-amber-400 tw-transition-colors tw-bg-transparent"
                  onClick={() => handleSort(RecommendationGraphEnum.CMC_RANK)}
                >
                  {t("CMC")}
                  <br />
                  {t("Position")}{" "}
                  {orderType === RecommendationGraphEnum.CMC_RANK &&
                    (sortDirection === "asc" ? "▲" : "▼")}
                </div>

                <div
                  className="tw-flex-1 tw-min-w-0 tw-flex tw-items-center tw-px-3 tw-py-2 tw-cursor-pointer hover:tw-text-amber-400 tw-transition-colors tw-bg-transparent"
                  onClick={() => handleSort(RecommendationGraphEnum.ALL_SUG)}
                >
                  <span className="tw-truncate">
                    {t("Name")}{" "}
                    {orderType === RecommendationGraphEnum.ALL_SUG &&
                      (sortDirection === "asc" ? "▲" : "▼")}
                  </span>
                </div>

                <div
                  className="tw-w-36 tw-shrink-0 tw-flex tw-items-center tw-justify-center tw-px-3 tw-py-2 tw-cursor-pointer hover:tw-text-amber-400 tw-transition-colors tw-bg-transparent"
                  onClick={() => handleSort(RecommendationGraphEnum.WEEK_ALL_PROFIT)}
                >
                  {t("Profit (7d)")}{" "}
                  {orderType === RecommendationGraphEnum.WEEK_ALL_PROFIT &&
                    (sortDirection === "asc" ? "▲" : "▼")}
                </div>

                <div className="tw-w-40 tw-shrink-0 tw-flex tw-items-center tw-justify-center tw-px-3 tw-py-2 tw-text-center tw-bg-transparent">
                  {t("Status")}
                </div>
              </div>

              {/* Rows */}
              <div className="tw-divide-y tw-divide-stone-800 tw-bg-transparent">
                {filteredData.map((item) => {
                  const rowId = getRowIdentifier(item);
                  const isSelected = selectedRowIds.includes(rowId);
                  const assetSymbol = item.asset_label.trim().toUpperCase();
                  const foundAssetCoin = allCurrencies.find(
                    (coin) => coin.symbol.toUpperCase() === assetSymbol
                  );
                  const isAssetTrading = tradingCoins.includes(
                    item.asset_label.toUpperCase()
                  );
                  const profitChange = item.week_0_profit - 1;

                  return (
                    <div
                      key={rowId}
                      onClick={() => handleRowClick(item)}
                      className={`tw-cursor-pointer tw-transition-colors tw-duration-200 ${
                        isSelected
                          ? "tw-bg-[color-mix(in_srgb,var(--secondary-color),transparent_70%)]"
                          : "hover:tw-bg-white/[0.04]"
                      }`}
                    >
                      {/* Mobile view (< 992px) */}
                      <div className="tw-flex lg:tw-hidden tw-flex-col tw-p-3.5 tw-py-6 tw-gap-2.5 tw-border-0 tw-border-b tw-border-solid tw-border-stone-400 tw-border-opacity-15">
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
                                  src={baseGoldIcon}
                                  alt={assetSymbol}
                                  className="tw-w-full tw-h-full tw-object-contain"
                                />
                              )}
                            </div>
                            <div className="tw-flex tw-flex-col tw-min-w-0">
                              <span className="tw-truncate tw-font-semibold tw-text-base sm:tw-text-base tw-text-stone-100">
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
                              className={`tw-text-base sm:tw-text-sm tw-font-medium ${
                                profitChange >= 0
                                  ? "tw-text-[var(--green-color)]"
                                  : "tw-text-[var(--red-color)]"
                              }`}
                            >
                              {profitChange
                                ? (profitChange * 100 > 0 ? "+" : "") +
                                (profitChange * 100).toFixed(2) +
                                "%"
                                : "-"}
                            </div>
                          </div>

                          <div className="tw-col-span-2">
                            <div className="tw-text-xs tw-text-[var(--gray-2-color)] tw-mb-1">
                              {t("Status")}
                            </div>
                            <div
                              className={`status-container d-flex align-items-center justify-content-center tw-text-xs sm:tw-text-sm ${
                                isAssetTrading
                                  ? "color-container--green"
                                  : "color-container--red"
                              }`}
                              style={{
                                color: isAssetTrading
                                  ? "var(--green-color)"
                                  : "var(--red-color)",
                              }}
                            >
                              {isAssetTrading ? t("Trading") : t("Not Trading")}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop view (>= 992px) */}
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

                        <div className="tw-w-24 tw-shrink-0 tw-flex tw-items-center tw-px-3 tw-py-2 tw-text-stone-400 tw-bg-transparent">
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
                                src={baseGoldIcon}
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
                          className={`tw-w-36 tw-shrink-0 tw-flex tw-items-center tw-justify-center tw-px-3 tw-py-2 tw-bg-transparent ${
                            profitChange >= 0
                              ? "tw-text-[var(--green-color)]"
                              : "tw-text-[var(--red-color)]"
                          }`}
                        >
                          {profitChange
                            ? (profitChange * 100 > 0 ? "+" : "") +
                            (profitChange * 100).toFixed(2) +
                            "%"
                            : "-"}
                        </div>

                        <div className="tw-w-40 tw-shrink-0 tw-flex tw-items-center tw-justify-center tw-px-3 tw-py-2 tw-bg-transparent">
                          <div
                            className={`status-container d-flex align-items-center justify-content-center ${
                              isAssetTrading
                                ? "color-container--green"
                                : "color-container--red"
                            }`}
                            style={{
                              color: isAssetTrading
                                ? "var(--green-color)"
                                : "var(--red-color)",
                            }}
                          >
                            {isAssetTrading ? t("Trading") : t("Not Trading")}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div ref={loaderRef}>{loading && <AssetRowSkeleton />}</div>
            </div>
          ) : (
            <div className="tw-p-20 tw-text-center tw-text-stone-400">
              {t("No data found")}
            </div>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer className="custom-modal-footer tw-flex tw-justify-between tw-items-center">
        <span className="tw-text-xs sm:tw-text-sm tw-text-stone-400">
          {t("Selected")}:{" "}
          <strong className="tw-text-stone-200">{selectedRowIds.length}</strong>
        </span>
        <Button onClick={handleAddSelected} disabled={selectedRowIds.length === 0}>
          {t("Add")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};