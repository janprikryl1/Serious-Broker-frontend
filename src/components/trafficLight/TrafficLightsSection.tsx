import React, { FC, useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { TrafficLightListCard } from "./TrafficLightListCard.tsx";
import { ReviewTrafficLightModal } from "./ReviewTrafficLightModal.tsx";
import {getTrafficLights} from "../../utils/api/trafficLightsService.ts";
import {TrafficLightType} from "../../utils/types/trafficLight/TrafficLightType.ts";

export type TrafficLightsSectionProps = {
  selectedBuyId: number | null;
  selectedSellId: number | null;
  onSelectBuy: (id: number | null) => void;
  onSelectSell: (id: number | null) => void;
  onOpenCreateModal?: (type: "buy" | "sell") => void;
  currency?: string;
};

export const TrafficLightsSection: FC<TrafficLightsSectionProps> = ({
                                                                      selectedBuyId,
                                                                      selectedSellId,
                                                                      onSelectBuy,
                                                                      onSelectSell,
                                                                      onOpenCreateModal,
                                                                      currency = "EUR",
                                                                    }) => {
  const [userBuyTrafficLights, setUserBuyTrafficLights] = useState<TrafficLightType[]>([]);
  const [userSellTrafficLights, setUserSellTrafficLights] = useState<TrafficLightType[]>([]);
  const [activeReviewItem, setActiveReviewItem] = useState<TrafficLightType | null>(null);

  const fetchTrafficLights = async () => {
    try {
      const response = await getTrafficLights();
      if (response?.data) {
        const parseItem = (item: any): TrafficLightType => ({
          ...item,
          triggers: typeof item.triggers === "string" ? JSON.parse(item.triggers) : item.triggers,
        });

        setUserBuyTrafficLights(
          response.data.filter((tl: any) => tl.type === "buy").map(parseItem)
        );
        setUserSellTrafficLights(
          response.data.filter((tl: any) => tl.type === "sell").map(parseItem)
        );
      }
    } catch (error) {
      console.error("Failed to fetch traffic lights", error);
    }
  };

  useEffect(() => {
    fetchTrafficLights();
  }, []);

  const handleToggleSelect = () => {
    if (!activeReviewItem) return;
    const isBuy = activeReviewItem.type === "buy";

    if (isBuy) {
      onSelectBuy(selectedBuyId === activeReviewItem.id ? null : (activeReviewItem.id ?? null));
    } else {
      onSelectSell(selectedSellId === activeReviewItem.id ? null : (activeReviewItem.id ?? null));
    }

    setActiveReviewItem(null);
  };

  const isCurrentSelected =
    activeReviewItem?.type === "buy"
      ? selectedBuyId === activeReviewItem?.id
      : selectedSellId === activeReviewItem?.id;

  return (
    <>
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 xl:tw-gap-6 2xl:tw-gap-8">
        {/* BUY COLUMN */}
        <div className="tw-flex tw-flex-col tw-mb-4 tw-mt-4 lg:tw-mb-0">
          <div className="tw-text-base sm:tw-text-xl tw-text-[var(--white-color)] tw-font-['Sora']">
            <Trans
              i18nKey="trafficLight.selectBuyTrafficLights"
              components={{ highlight: <span className="tw-text-secondary" /> }}
            />
          </div>
          <TrafficLightListCard
            type="buy"
            trafficLights={userBuyTrafficLights}
            selectedId={selectedBuyId}
            onItemClick={(item) => setActiveReviewItem(item)}
            onDefineClick={onOpenCreateModal ? () => onOpenCreateModal("buy") : undefined}
          />
        </div>

        {/* SELL COLUMN */}
        <div className="tw-flex tw-flex-col tw-mt-4">
          <div className="tw-text-base sm:tw-text-xl tw-text-[var(--white-color)] tw-font-['Sora']">
            <Trans
              i18nKey="trafficLight.selectSellTrafficLights"
              components={{ highlight: <span className="tw-text-secondary" /> }}
            />
          </div>
          <TrafficLightListCard
            type="sell"
            trafficLights={userSellTrafficLights}
            selectedId={selectedSellId}
            onItemClick={(item) => setActiveReviewItem(item)}
            onDefineClick={onOpenCreateModal ? () => onOpenCreateModal("sell") : undefined}
          />
        </div>
      </div>

      {/* Review Modal */}
      <ReviewTrafficLightModal
        show={Boolean(activeReviewItem)}
        onClose={() => setActiveReviewItem(null)}
        trafficLight={activeReviewItem}
        isSelected={isCurrentSelected}
        onToggleSelect={handleToggleSelect}
        currency={currency}
      />
    </>
  );
};