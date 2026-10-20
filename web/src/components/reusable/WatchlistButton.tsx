import { FC, useEffect, useState } from "react";
import type { MouseEvent } from "react";
import type { WatchListEnum } from "../../utils/enums/WatchListEnum.ts";
import { useTranslation } from "react-i18next";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { showToast } from "../toast/toastHelper.tsx";
import { captureEvent } from "../../utils/posthog.ts";

type Props = {
  itemId?: number;
  itemType?: WatchListEnum;
  isInWatchList?: boolean;
  onToggle?: () => Promise<boolean | void> | boolean | void;
  className?: string;
  size?: number;
  disabled?: boolean;
};

export const WatchlistButton: FC<Props> = ({
  itemId,
  itemType,
  isInWatchList,
  onToggle,
  className = "",
  size = 20,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [internalIsInWatchList, setInternalIsInWatchList] = useState(Boolean(isInWatchList));

  useEffect(() => {
    if (itemId !== undefined && itemType !== undefined) {
      setInternalIsInWatchList(Boolean(isInWatchList));
      return;
    }

    if (isInWatchList !== undefined) {
      setInternalIsInWatchList(Boolean(isInWatchList));
    }
  }, [isInWatchList, itemId, itemType]);

  const activeIsInWatchList = itemId !== undefined && itemType !== undefined
    ? internalIsInWatchList
    : isInWatchList ?? internalIsInWatchList;

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (disabled || !onToggle || (itemId === undefined && itemType === undefined && isInWatchList === undefined)) return;

    setIsAnimating(true);
    window.setTimeout(() => setIsAnimating(false), 500);

    try {
      const shouldKeepState = await onToggle();
      if (shouldKeepState === false) {
        setInternalIsInWatchList((prev) => !prev);
      } else if (itemId !== undefined && itemType !== undefined) {
        setInternalIsInWatchList((prev) => !prev);
      }

      showToast.success(t(activeIsInWatchList ? "Removed from watchlist" : "Added to watchlist"));
      captureEvent(activeIsInWatchList ? "watchlist_item_removed" : "watchlist_item_added", {
        item_id: itemId,
        item_type: itemType,
      });
    } catch (error) {
      console.error("Error toggling watchlist:", error);
      setInternalIsInWatchList((prev) => !prev);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-label={activeIsInWatchList ? t("Remove from watchlist") : t("Add to watchlist")}
      className={`tw-relative tw-bg-transparent tw-border-0 tw-p-0 tw-flex tw-items-center tw-justify-center tw-w-8 tw-h-8 ${disabled ? "tw-cursor-not-allowed tw-opacity-50" : "tw-cursor-pointer"} ${className}`}
    >
      {isAnimating && (
        <div className="watchlist-burst">
          <span className="particle p1"></span>
          <span className="particle p2"></span>
          <span className="particle p3"></span>
          <span className="particle p4"></span>
          <span className="particle p5"></span>
          <span className="particle p6"></span>
        </div>
      )}

      <div className={isAnimating ? "animate-bounce-pop" : ""}>
        {activeIsInWatchList ? (
          <BsBookmarkFill size={size} className="tw-text-2xl tw-text-[var(--secondary-color)] tw-transition-all tw-duration-200" />
        ) : (
          <BsBookmark size={size} className="tw-text-2xl tw-text-[var(--secondary-color)] hover:tw-scale-110 tw-transition-all tw-duration-200" />
        )}
      </div>
    </button>
  );
};