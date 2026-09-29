import React, { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { coinURL } from "../../../../utils/constants";
import { Assets } from "../../../../utils/types/asset/AssetDetailType.ts";
import { GlassCard } from "../../../reusable/GlassCard.tsx";
import { Button, ButtonColor } from "../../../reusable/Button.tsx";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import fallbackCoin from "../../../../utils/icons/coins/base_gold.png";

export type PortfolioFormCardProps = {
  name: string;
  onNameChange: (value: string) => void;
  assets: Assets[];
  onAllocationChange: (id: number, value: string) => void;
  onRemoveAsset: (symbol: string) => void;
  onRecompute: () => void;
  onOpenAddModal: () => void;
  hasSubmitted: boolean;
};

export const PortfolioFormCard: FC<PortfolioFormCardProps> = ({
                                                                name,
                                                                onNameChange,
                                                                assets,
                                                                onAllocationChange,
                                                                onRemoveAsset,
                                                                onRecompute,
                                                                onOpenAddModal,
                                                                hasSubmitted,
                                                              }) => {
  const { t } = useTranslation();

  const getMarketCapValue = (item: any) => {
    const rawValue = item?.marketCap ?? item?.marketcap ?? 0;
    return Number.isFinite(rawValue) ? rawValue : 0;
  };

  const sortedAssets = useMemo(() => {
    return [...assets].sort((a, b) => getMarketCapValue(b) - getMarketCapValue(a));
  }, [assets]);

  // Validácie
  const isNameEmpty = !name || name.trim() === "";
  const sumAllocations = assets.reduce(
    (acc, curr) => acc + (Number(curr.allocation) || 0),
    0
  );
  const isAllocationInvalid =
    assets.length === 0 || Math.abs(sumAllocations - 1.0) >= 0.001;

  const showValidationErrors = hasSubmitted && (isNameEmpty || isAllocationInvalid);

  return (
    <div className="tw-flex tw-flex-col tw-items-center lg:tw-items-start tw-w-full">
      <GlassCard
        className="tw-mt-6 tw-mx-auto !tw-px-5 sm:!tw-p-6 tw-max-w-xl tw-min-w-[30rem]"
        bgColor={showValidationErrors ? "var(--red-color)" : "var(--true-black)"}
        opacity={showValidationErrors ? 0.2 : 0.1}
      >
        <div className="tw-text-xs sm:tw-text-sm tw-text-stone-400 tw-mb-1">{t("Name")}</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder={t("Enter portfolio name...")}
            className="form-control outline-input tw-outline tw-outline-[rgba(168,162,158,0.2)]"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </div>

        {/* Selected assets */}
        <div className="tw-mt-10 tw-w-full !tw-bg-transparent">
          {sortedAssets.length > 0 ? (
            <>
              <div className="tw-grid tw-grid-cols-[1fr_auto] tw-items-center tw-pb-2 tw-border-0 tw-border-b tw-border-solid tw-border-stone-500 tw-border-opacity-30 tw-text-xs sm:tw-text-sm tw-font-semibold tw-text-stone-300 !tw-bg-transparent">
                <div>{t("Name")}</div>
                <div className="tw-text-right tw-pr-8 sm:tw-pr-9">{t("Allocation")}</div>
              </div>

              <div className="tw-divide-y tw-divide-stone-700 !tw-bg-transparent">
                {sortedAssets.map((assetItem) => (
                  <div
                    key={assetItem.id}
                    className="tw-grid tw-grid-cols-[1fr_auto] tw-items-center tw-py-2.5 sm:tw-py-3 !tw-bg-transparent"
                  >
                    <div className="tw-flex tw-items-center tw-gap-2.5 sm:tw-gap-3.5 tw-min-w-0">
                      <img
                        src={assetItem.photo ? `${coinURL}/${assetItem.photo}` : fallbackCoin}
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
                          onChange={(e) =>
                            onAllocationChange(assetItem.id, e.target.value)
                          }
                          className="form-control outline-input tw-outline tw-outline-1 tw-outline-[rgba(168,162,158,0.2)] tw-w-14 sm:tw-w-16 tw-h-8 sm:tw-h-9 tw-px-1.5 tw-text-right tw-text-xs sm:tw-text-sm !tw-bg-transparent"
                        />
                        <span className="tw-text-xs sm:tw-text-sm tw-text-stone-400">%</span>
                      </div>

                      <button
                        type="button"
                        className="tw-p-0.5 tw-text-rose-500 hover:tw-text-rose-400 tw-transition-colors tw-bg-transparent tw-border-0 tw-flex tw-items-center tw-justify-center"
                        onClick={() => onRemoveAsset(assetItem.asset_label)}
                        title={t("Remove")}
                      >
                        <IoIosClose size={26} className="sm:tw-w-7 sm:tw-h-7" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="tw-py-8 tw-text-center tw-text-stone-400 tw-text-xs sm:tw-text-sm">
              {t("No cryptocurrencies selected yet.")}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4 tw-flex-wrap">
          <Button
            onClick={onOpenAddModal}
            color={ButtonColor.transparent}
            style={{
              padding: "5px 12px 5px 6px",
              border: "1px solid color-mix(in srgb, var(--secondary-color), transparent 40%)",
            }}
          >
            <div className="d-flex align-items-center gap-1 tw-text-stone-300">
              <FiPlus size={22} />
              <span className="tw-text-xs sm:tw-text-sm">{t("Add new cryptocurrency")}</span>
            </div>
          </Button>

          {assets.length > 0 && (
            <Button
              onClick={onRecompute}
              color={ButtonColor.transparent}
              style={{
                padding: "5px 12px",
                border: "1px solid color-mix(in srgb, var(--secondary-color), transparent 40%)"
              }}
            >
              <div className="d-flex align-items-center gap-2 tw-text-stone-300">
                <FiRefreshCw size={16} />
                <span className="tw-text-xs sm:tw-text-sm">{t("Recompute allocations")}</span>
              </div>
            </Button>
          )}
        </div>
      </GlassCard>

      {/* Chybové správy pod kartou */}
      {hasSubmitted && isNameEmpty && (
        <div className="tw-text-rose-500 tw-mt-2 tw-text-sm sm:tw-text-base">
          {t("Portfolio name is required.")}
        </div>
      )}

      {hasSubmitted && isAllocationInvalid && (
        <div className="tw-text-rose-500 tw-mt-2 tw-text-sm sm:tw-text-base">
          {assets.length === 0
            ? t("Please select at least one cryptocurrency.")
            : t("Allocation must be 100% in total.")}
        </div>
      )}
    </div>
  );
};