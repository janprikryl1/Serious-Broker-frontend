import { FC } from "react";
import { Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { TrafficLightWrapper } from "./TrafficLightWrapper.tsx";

export const TrafficLightFormModal: FC<any> = ({
  show,
  onHide,
  title,
  variant,
  triggers,
  type,
  name,
  reference,
  onTriggerChange,
  onTriggerDelete,
  onTriggerAdd,
  onNameChange,
  onReferenceChange,
  onTypeChange,
  onSave,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size={"xl"}
      scrollable
      style={{ zIndex: 3001 }}
      contentClassName="custom-modal"
    >
      <Modal.Header closeButton className="tw-border-0">
        <Modal.Title as="h3" className="tw-text-lg sm:tw-text-xl lg:tw-text-2xl">
          {t(title, {
            type: t(type === "buy" ? "BuyTL" : "SellTL"),
          })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="!tw-overflow-y-auto tw-overflow-x-hidden">
        <div>
          <div className="mb-4 tw-text-sm sm:tw-text-base">
            {t('trafficLight.triggerDescription')}
          </div>

          {variant === "create" && onTypeChange && (
            <div className="mb-4 tw-flex tw-flex-wrap tw-gap-3 tw-items-center">
              <Form.Check
                type="radio"
                inline
                label={t("Buy Traffic Light")}
                name="traffic-light-type-modal"
                checked={type === "buy"}
                onChange={() => onTypeChange("buy")}
                className="[&_.form-check-input:checked]:tw-bg-secondary [&_.form-check-input:checked]:tw-border-secondary [&_.form-check-input:focus]:tw-border-secondary [&_.form-check-input:focus]:tw-shadow-[0_0_0_0.25rem_rgba(var(--tw-color-primary-rgb),0.25)]"
              />
              <Form.Check
                type="radio"
                inline
                label={t("Sell Traffic Light")}
                name="traffic-light-type-modal"
                checked={type === "sell"}
                onChange={() => onTypeChange("sell")}
                className="[&_.form-check-input:checked]:tw-bg-secondary [&_.form-check-input:checked]:tw-border-secondary [&_.form-check-input:focus]:tw-border-secondary [&_.form-check-input:focus]:tw-shadow-[0_0_0_0.25rem_rgba(var(--tw-color-primary-rgb),0.25)]"
              />
            </div>
          )}

          {/* Triggers */}
          <TrafficLightWrapper
            triggers={triggers}
            variant={variant === "create" ? "edit" : "edit"}
            type={type}
            name={name}
            reference={reference}
            onTriggerChange={onTriggerChange}
            onTriggerDelete={onTriggerDelete}
            onTriggerAdd={onTriggerAdd}
            onNameChange={onNameChange}
            onReferenceChange={onReferenceChange}
            onTrafficLightCreate={onSave}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};
