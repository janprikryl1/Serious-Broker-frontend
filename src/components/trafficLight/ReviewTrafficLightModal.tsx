import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { TrafficLightWrapper } from "./TrafficLightWrapper.tsx";
import { Button, ButtonColor } from "../reusable/Button.tsx";
import { TrafficLightType } from "../../utils/types/trafficLight/TrafficLightType.ts";

export type ReviewTrafficLightModalProps = {
  show: boolean;
  onClose: () => void;
  trafficLight: TrafficLightType | null;
  isSelected: boolean;
  onToggleSelect: () => void;
  currency?: string;
};

export const ReviewTrafficLightModal: FC<ReviewTrafficLightModalProps> = ({
                                                                            show,
                                                                            onClose,
                                                                            trafficLight,
                                                                            isSelected,
                                                                            onToggleSelect,
                                                                            currency = "EUR",
                                                                          }) => {
  const { t } = useTranslation();

  if (!trafficLight) return null;

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      scrollable
      size="xl"
      contentClassName="custom-modal"
    >
      <Modal.Header closeButton className="tw-border-0 tw-p-0 tw-m-0" />
      <Modal.Body className="tw-p-0 lg:tw-px-5 tw-max-h-[calc(100dvh-120px)] sm:tw-max-h-[80vh] !tw-overflow-y-auto">
        <TrafficLightWrapper
          triggers={trafficLight.triggers}
          variant="details"
          type={trafficLight.type}
          name={trafficLight.name}
          reference={trafficLight.reference}
          basePrice={100}
          currency={currency}
        />
        <div className="tw-text-center tw-mt-4 tw-pb-4 sm:tw-pb-2">
          <Button color={ButtonColor.gold} onClick={onToggleSelect}>
            <span className="tw-text-base sm:tw-text-md">
              {isSelected
                ? t("Deselect this Traffic Light")
                : t("Select this Traffic Light")}
            </span>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};