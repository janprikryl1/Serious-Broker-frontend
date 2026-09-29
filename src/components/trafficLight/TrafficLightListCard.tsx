import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import { GlassCard } from "../reusable/GlassCard.tsx";
import { TrafficLightType } from "../../utils/types/trafficLight/TrafficLightType.ts";
import { Button, ButtonColor } from "../reusable/Button.tsx";

export type TrafficLightListCardProps = {
  type: "buy" | "sell";
  trafficLights: TrafficLightType[];
  selectedId: number | null;
  onItemClick: (item: TrafficLightType) => void;
  onDefineClick?: () => void;
  isLoading?: boolean;
};

export const TrafficLightListCard: FC<TrafficLightListCardProps> = ({
                                                                      type,
                                                                      trafficLights,
                                                                      selectedId,
                                                                      onItemClick,
                                                                      onDefineClick,
                                                                      isLoading = false,
                                                                    }) => {
  const { t } = useTranslation();
  const isBuy = type === "buy";

  return (
    <GlassCard className="tw-px-0 tw-py-4 tw-mt-7 tw-mx-0 tw-w-full tw-flex-1 tw-overflow-hidden">
      <div className="tw-h-full">
        <div className="content tw-flex tw-flex-col">
          {isLoading ? (
            <div className="tw-w-full tw-flex tw-flex-col tw-gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="tw-flex tw-items-center tw-justify-between tw-mx-auto tw-py-2.5 tw-w-[93%] tw-border-0 tw-border-b tw-border-solid tw-border-stone-400 tw-border-opacity-30"
                >
                  <Skeleton
                    width={140}
                    height={20}
                    borderRadius={4}
                    baseColor="rgba(255, 255, 255, 0.05)"
                    highlightColor="rgba(255, 255, 255, 0.1)"
                  />
                  <div className="tw-flex tw-items-center tw-gap-[5px]">
                    {Array.from({ length: 3 }).map((_, dotIdx) => (
                      <Skeleton
                        key={dotIdx}
                        circle
                        width={16}
                        height={16}
                        baseColor="rgba(255, 255, 255, 0.05)"
                        highlightColor="rgba(255, 255, 255, 0.1)"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : trafficLights.length < 1 ? (
            <div className="tw-p-4 tw-text-center tw-my-auto">
              <div className="tw-mb-4 tw-text-sm sm:tw-text-base tw-text-stone-400">
                {isBuy
                  ? t("You have no buy traffic lights defined")
                  : t("You have no sell traffic lights defined")}
              </div>
              {onDefineClick && (
                <Button
                  color={ButtonColor.lightBrown}
                  shadow={true}
                  className="tw-mb-0 tw-font-normal"
                  onClick={onDefineClick}
                >
                  {isBuy ? t("Define buy traffic light") : t("Define sell traffic light")}
                </Button>
              )}
            </div>
          ) : (
            <div className="tw-w-full">
              {trafficLights.map((trafficLight) => {
                const isSelected = selectedId === trafficLight.id;
                return (
                  <div
                    key={trafficLight.id}
                    className={`tw-group tw-relative tw-w-full tw-my-1 tw-cursor-pointer tw-transition-[opacity,background-color] tw-duration-300 tw-ease-in-out tw-text-stone-300 hover:tw-bg-[var(--tertiary-color)] hover:tw-text-[var(--white-color)] ${
                      isSelected
                        ? "tw-bg-[var(--secondary-color-transparent-50)] tw-text-[var(--white-color)] tw-cursor-default"
                        : ""
                    }`}
                    onClick={() => onItemClick(trafficLight)}
                  >
                    <div className="tw-relative tw-flex tw-items-center tw-justify-start tw-mx-auto tw-py-1 tw-w-[93%] tw-text-base sm:tw-text-lg tw-border-0 tw-border-b tw-border-solid tw-border-stone-400 tw-border-opacity-30">
                      <span>{trafficLight.name}</span>
                      {isSelected && (
                        <div className="tw-ml-[10px] tw-text-[var(--white-color)] tw-flex tw-items-center tw-justify-center">
                          <FaCheck size={20} />
                        </div>
                      )}
                      <div
                        className={`tw-absolute tw-right-0 tw-top-1/2 tw-flex tw-items-center tw-gap-[5px] tw-pointer-events-none tw-transition-all tw-duration-300 tw-ease-in-out ${
                          isSelected
                            ? "tw-opacity-100 -tw-translate-y-1/2 tw-translate-x-0"
                            : "tw-opacity-0 -tw-translate-y-1/2 tw-translate-x-[10px] group-hover:tw-opacity-100 group-hover:tw-translate-x-0"
                        }`}
                      >
                        {trafficLight.triggers.map((trigger, idx) => (
                          <div
                            key={idx}
                            className="tw-inline-block tw-aspect-square tw-w-[14px] sm:tw-w-[17px] tw-h-[14px] sm:tw-h-[17px] tw-rounded-full"
                            style={{ backgroundColor: trigger.color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};