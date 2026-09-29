import React, {FC} from "react";
import {useTranslation} from "react-i18next";

type StepperProps = {
  steps: string[];
  currentStep: number;
};

export const Stepper: FC<StepperProps> = ({steps, currentStep}) => {
  const {t} = useTranslation();

  return (
    <div className="tw-flex tw-justify-between tw-items-end tw-mb-10 tw-mx-auto tw-w-full sm:tw-w-4/5">
      {steps.map((label, i) => {
        const isCurrent = i === currentStep;
        const isPast = i < currentStep;
        const isActive = i <= currentStep;
        const isLineActive = i < currentStep;
        const isLast = i === steps.length - 1;

        return (
          <div
            key={i}
            className="tw-flex tw-flex-col tw-items-center tw-flex-1"
          >
            <div
              className={`tw-mb-2.5 tw-transition-colors tw-duration-300 tw-text-center ${
                isCurrent ? "tw-block" : "tw-hidden sm:tw-block"
              } tw-text-xs sm:tw-text-sm md:tw-text-base`}
              style={{
                color: isActive ? "var(--secondary-color)" : "var(--gray-1-color)",
              }}
            >
              {t(label)}
            </div>

            <div className="tw-relative tw-flex tw-items-center tw-justify-center tw-w-full">

              <div
                className={`tw-rounded-full tw-flex tw-justify-center tw-items-center tw-z-10 tw-transition-all tw-duration-300 tw-w-[25px] tw-h-[25px] tw-text-xs sm:tw-text-sm tw-text-black ${isActive ? "tw-bg-secondary" : "tw-bg-stone-600"}`}
                style={{
                  boxShadow: isCurrent
                    ? "0 4px 8px 5px color-mix(in srgb, var(--secondary-color), transparent 90%)"
                    : "none",
                }}
              >
                <span className="tw-inline">
                  {i + 1}
                </span>
              </div>

              {!isLast && (
                <div
                  className={`tw-absolute tw-top-1/2 -tw-translate-y-1/2 tw-left-1/2 tw-w-full tw-h-[1px] tw-z-0 tw-transition-colors tw-duration-300 ${
                    isLineActive ? "tw-block" : "tw-hidden sm:tw-block"
                  }`}
                  style={{
                    backgroundColor: isLineActive
                      ? "var(--secondary-color)"
                      : "transparent",
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};